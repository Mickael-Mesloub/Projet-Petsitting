import NotFound from "../../../components/notFound/NotFound";
import { Helmet } from "react-helmet";

const NotFoundPage = () => {

  return (
    <>
      <Helmet>
          <title>Rubieland 🐶 - Erreur 404 : Cette page n'existe pas !</title>
          <meta 
              name="description" 
              content="Erreur 404 : Cette page n'existe pas !"
          />
          <meta name="keywords" content="site, dogsitting, garderie, toilettage, éducation, canin, chien, vendée, la roche sur yon, essarts en bocage, 85000, 85" />
      </Helmet>
      <NotFound />
    </>
  );
};

export default NotFoundPage;
