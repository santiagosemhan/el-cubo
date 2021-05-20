import NameUtils from 'utils/Names';

const base_url = 'https://rtvcplay.co';
const elcubo_base_url = 'https://elcubo.rtvcplay.co';
const register = `${base_url}/login?ref=${elcubo_base_url}/el-cubo/temporada-1/`;
const registerCharacters = `${base_url}/login?ref=${elcubo_base_url}/el-cubo/temporada-1/personajes`;
const logout = `${base_url}/logout?ref=${elcubo_base_url}/el-cubo/temporada-1`;
const logoutCharacters = `${base_url}/logout?ref=${elcubo_base_url}/el-cubo/temporada-1/personajes`;
const guest = '/el-cubo/temporada-1/guest';
const characters = '/el-cubo/temporada-1/personajes';
const notFound = `/el-cubo/404`;

const cronoReward = (character) => {
    const charName = NameUtils.getCharacterName(character);
    if (charName) {
        return `/el-cubo/temporada-1/cronologico/recompensa/${charName}`;
    }
    return notFound;
};

export default {
    register,
    registerCharacters,
    guest,
    characters,
    cronoReward,
    logout,
    logoutCharacters,
};