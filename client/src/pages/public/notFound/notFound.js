import NotFound from "../../../components/notFound/NotFound";

const NotFoundPage = () => {
  const content = {
    title: "Erreur 404 : PAGE NOT FOUND",
    content: "Cette page n'existe pas.",
    linkTo: {
      messsage: "Revenir à l'accueil 👇",
      linkToHomepage: "/",
      content: "Accueil",
    },
  };

  return (
    <NotFound
      title={content.title}
      content={content.content}
      message={content.linkTo.messsage}
      linkToHomepage={content.linkTo.linkToHomepage}
      linkToContent={content.linkTo.content}
    />
  );
};

export default NotFoundPage;
