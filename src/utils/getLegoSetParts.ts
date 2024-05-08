import axios from "axios";

interface Part {
  part_num: string;
  name: string;
  part_cat_id: number;
  part_url: string;
  part_img_url: string;
  external_ids: any;
  print_of: string | null;
}

interface Color {
  id: number;
  name: string;
  rgb: string;
  is_trans: boolean;
  external_ids: any;
}

export interface LegoPart {
  id: number;
  inv_part_id: number;
  part: Part;
  color: Color;
  set_num: string;
  quantity: number;
  is_spare: boolean;
  element_id: string;
  num_sets: number;
}

interface PartsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: LegoPart[];
}

export const getLegoSetParts = async (setNum: string): Promise<LegoPart[]> => {
  const apiKey = "key 53d72e71c167884dc608b52d11371672";
  let parts: LegoPart[] = [];
  let nextPage:
    | string
    | null = `https://rebrickable.com/api/v3/lego/sets/${setNum}/parts/?page_size=1000`;

  while (nextPage) {
    try {
      const response: any = await axios.get<PartsResponse>(nextPage, {
        headers: {
          Accept: "application/json",
          Authorization: apiKey,
        },
      });

      parts = parts.concat(response.data.results);
      nextPage = response.data.next;
    } catch (error) {
      console.error("Failed to fetch parts:", error);
      return [];
    }
  }

  return parts;
};
