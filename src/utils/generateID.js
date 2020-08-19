import jwt_decode from "jwt-decode";
const generateId = () => {
  const token = localStorage.getItem("jwtToken");
  const decoded = jwt_decode(token);

  if (decoded !== null && decoded.hasOwnProperty("name")) {
    const name = decoded.name;
    let unique_id = Date.now().toString(36);
    let hash = 0;

    for (let i = 0; i < name.length; i++) {
      let chr = name.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash + unique_id;
  } else {
    return Date.now().toString(36);
  }
};

export default generateId;
