import { publicApi } from "../services";

// Define TypeScript types for the response structure
export type BuildingInstruction = {
  sequence: {
    total: number;
    element: number;
  };
  image: {
    size: number;
    modifiedDate: string;
    url: string;
  };
  file: {
    size: number;
    modifiedDate: string;
    url: string;
  };
  description: string;
  id: string;
  type: string;
};

type ProductVersion = {
  characteristics: {
    isBatteryOperated: boolean;
    hasSmallBall: boolean;
  };
  piece_count: number;
  item_id: number;
  building_instructions: BuildingInstruction[];
  availability: {
    marketingExitDate: string;
    launchDate: string;
  };
  measurements: {
    itemId: number;
    length: number;
    width: number;
    sizeUnit: string;
    height: number;
  };
};

type ApiResponse = {
  took: number;
  timed_out: boolean;
  _shards: {
    total: number;
    successful: number;
    skipped: number;
    failed: number;
  };
  hits: {
    total: {
      value: number;
      relation: string;
    };
    max_score: number;
    hits: Array<{
      _index: string;
      _type: string;
      _id: string;
      _score: number;
      _source: {
        product_versions: ProductVersion[];
      };
    }>;
  };
};

// Function to get building instructions by set number
export async function getBuildingInstructionBySetNumber(
  productNumber: string
): Promise<BuildingInstruction[] | []> {
  try {
    const response = await publicApi.post<ApiResponse>(
      "https://services.slingshot.lego.com/api/v4/lego_historic_product_read/_search",
      {
        _source: ["product_versions"],
        from: 0,
        size: 1,
        query: {
          bool: {
            must: [{ term: { product_number: productNumber } }],
          },
        },
      },
      {
        headers: {
          "content-type": "application/json",
          "x-api-key": "p0OKLXd8US1YsquudM1Ov9Ja7H91jhamak9EMrRB",
        },
      }
    );

    const hits = response.data.hits.hits;
    if (
      hits.length > 0 &&
      hits[0]._source.product_versions[0].building_instructions
    ) {
      return hits[0]._source.product_versions[0].building_instructions;
    }
    return [];
  } catch (error) {
    console.error("Error fetching building instructions:", error);
    return [];
  }
}
