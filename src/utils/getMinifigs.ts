import axios from "axios";

export interface Minifig {
  id: number;
  set_num: string;
  set_name: string;
  quantity: number;
  set_img_url: string;
}

interface MinifigsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Minifig[];
}

// Function to fetch minifig data
export const getMinifigs = async (setNum: string): Promise<Minifig[]> => {
  const url = `https://rebrickable.com/api/v3/lego/sets/${setNum}/minifigs/`;
  const headers = {
    Accept: "application/json",
    Authorization: "key 53d72e71c167884dc608b52d11371672",
  };

  try {
    const response = await axios.get<MinifigsResponse>(url, { headers });
    return response.data.results; // Return only the results array containing minifig data
  } catch (error) {
    console.error("Error fetching minifigs:", error);
    return [] as Minifig[]; // In case of an error, return null or handle accordingly
  }
};
