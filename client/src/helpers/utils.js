export const animalSize = (size) => {
  let text = "";
  if (size === "small") {
    text = "Petit toutou (moins de 10kg)";
  } else if (size === "medium") {
    text = "Moyen toutou (entre 10kg et 25kg)";
  } else {
    text = "Grand toutou (plus de 25kg)";
  }

  return text;
};

export const capitalizeUsername = async (user, name) => {
  if (user.isLogged) {
    const username = await name;
    const usernameFirstLetter = await username.charAt(0);
    const capitalizedUsername =
      (await usernameFirstLetter.toUpperCase()) + username.slice(1);
    return capitalizedUsername;
  }
};
