import Episode from "../types/episodio.types";
import PageInfo from "../types/pageInfo.types";
import Personaje from "../types/personaje.types";

/**
 * Function that returns all the charecters per page and filtered by name if this is required.
 *
 * @param {string | undefined} name
 * @returns {Promise<[Personaje[], PageInfo, number] | [any, any, number]>} returns characters and info
 */
export const getPersonajesAPI = async (
  name?: string
): Promise<[Personaje[], PageInfo, number] | [any, any, number]> => {
  let nameParam = "";
  if (name !== "" && name !== undefined) {
    nameParam = `name=${name}`;
  }
  return fetch(`https://rickandmortyapi.com/api/character?${nameParam}`).then(
    function (response) {
      return response
        .json()
        .then((data) => [data.results, data.info, response.status]);
    }
  );
};

/**
 *  Function that returns characters per page.
 *
 * @param {string }url
 * @returns {Promise<[Personaje[], PageInfo]>} returns characters and info
 */
export const changePage = async (
  url: string
): Promise<[Personaje[], PageInfo]> => {
  return fetch(url)
    .then((data) => data.json())
    .then((data) => [data.results, data.info]);
};

/**
 * Function that returns all the episods of a character.
 *
 * @param {Array<number>} arrayEpisodioID
 * @returns {Promise<Episodio | Episodio[]>} returns all episodes of one character
 */
export const fetchEpisodios = async (
  arrayEpisodioID: (string | undefined)[]
): Promise<Episode | Episode[]> => {
  return (
    await fetch(`https://rickandmortyapi.com/api/episode/${arrayEpisodioID}`)
  ).json();
};
