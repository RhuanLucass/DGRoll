import { useContext, useEffect, useState } from "react";
import { ContainerCards, Container } from "./styles";
import { Card } from "../Card";
import * as pdfjsLib from "pdfjs-dist/webpack";
import { AuthContext } from "../../contexts/AuthContext";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

export const CardsWrapper = ({
  fetchSheetsFn,
  fetchRatingsFn,
  title,
  showButtons,
}) => {
  const { user, triggerUpdate } = useContext(AuthContext);
  const [thumbnails, setThumbnails] = useState({});
  const [sheets, setSheets] = useState([]);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const fetchSheets = async () => {
      const allSheets = await fetchSheetsFn(user?.id);
      if (allSheets) {
        setSheets(allSheets);
      }
    };

    fetchSheets();
  }, [fetchSheetsFn, user, triggerUpdate]);

  useEffect(() => {
    if (fetchRatingsFn) {
      const fetchRatings = async () => {
        const ratingsMap = {};

        for (const sheet of sheets) {
          const userRating = await fetchRatingsFn(user?.id, sheet.id_ficha);
          ratingsMap[sheet.id_ficha] = userRating || 0;
        }

        setRatings(ratingsMap);
      };

      fetchRatings();
    }
  }, [sheets, fetchRatingsFn, user]);

  useEffect(() => {
    const generateThumbnails = async () => {
      const thumbnailsMap = {};
      const thumbnailPromises = [];

      for (const sheet of sheets) {
        if (sheet?.pdf_ficha) {
          const promise = (async () => {
            try {
              const loadingTask = pdfjsLib.getDocument(
                `http://localhost:3000/${sheet.pdf_ficha}`
              );
              const pdf = await loadingTask.promise;
              const page = await pdf.getPage(1);
              const scale = 1.5;
              const viewport = page.getViewport({ scale });

              const canvas = document.createElement("canvas");
              const context = canvas.getContext("2d");
              canvas.height = viewport.height;
              canvas.width = viewport.width;

              const renderContext = {
                canvasContext: context,
                viewport: viewport,
              };

              await page.render(renderContext).promise;
              const imageUrl = canvas.toDataURL();
              thumbnailsMap[sheet.id_ficha] = imageUrl;
            } catch (error) {
              console.error("Erro ao carregar o PDF: ", error);
              thumbnailsMap[sheet.id_ficha] = null;
            }
          })();

          thumbnailPromises.push(promise);
        }
      }

      await Promise.all(thumbnailPromises);
      setThumbnails(thumbnailsMap);
    };

    generateThumbnails();
  }, [sheets]);

  return (
    <Container>
      <h2>{title}</h2>
      <ContainerCards>
        {Object.keys(thumbnails).length === sheets.length ? (
          sheets.map((sheet) => {
            const rating = user
              ? ratings[sheet.id_ficha]
              : sheet.media_avaliacao;
            return (
              <Card
                key={sheet.id_ficha}
                sheet={sheet}
                rating={rating}
                pdfThumbnail={thumbnails[sheet.id_ficha]}
                showButtons={showButtons}
              />
            );
          })
        ) : (
          <p>Carregando...</p>
        )}
      </ContainerCards>
    </Container>
  );
};
