
import { toast } from "@/hooks/use-toast";

const GEMINI_API_KEY = "AIzaSyAcHyUPpMZookNigrKWQjX7sr6zEkwVDkY"; // API key provided by user
const MODEL_NAME = "gemini-2.5-pro-preview-03-25";

interface MortgageRate {
  loan_type: string;
  rate: string;
  source: string;
}

export interface MortgageRatesResponse {
  mortgage_rates: {
    date: string;
    rates: MortgageRate[];
  };
}

export interface PropertyTaxInfo {
  state: string;
  average_rate: string;
  county_rate?: string;
}

/**
 * Fetches current mortgage rates using Gemini API with Google Search Grounding
 */
export const fetchMortgageRates = async (): Promise<MortgageRatesResponse | null> => {
  try {
    const prompt = `use search to gather todays mortgage interest rates from mortgage news daily, 2 rates specifically 30 year FHA and 30 year conventional output a structured json format in return exactly as below:
    
    {
      "mortgage_rates": {
        "date": "${new Date().toISOString().split('T')[0]}",
        "rates": [
          {
            "loan_type": "30-Year FHA",
            "rate": "",
            "source": "Mortgage News Daily"
          },
          {
            "loan_type": "30-Year Conventional",
            "rate": "",
            "source": "Mortgage News Daily"
          }
        ]
      }
    }`;

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/" + MODEL_NAME + ":generateContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.1,
          topK: 32,
          topP: 1,
          maxOutputTokens: 2048,
        },
        tools: [{
          googleSearchRetrieval: {}
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the JSON from the response text (Gemini might wrap it in markdown)
    const responseText = data.candidates[0].content.parts[0].text;
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]) as MortgageRatesResponse;
    } else {
      throw new Error("Failed to parse response");
    }
  } catch (error) {
    console.error("Error fetching mortgage rates:", error);
    toast({
      title: "Error Fetching Rates",
      description: "Could not retrieve current mortgage rates. Using default values.",
      variant: "destructive"
    });
    return null;
  }
};

/**
 * Fetches property tax rates for a specific location
 */
export const fetchPropertyTaxRate = async (state: string, zipCode?: string): Promise<PropertyTaxInfo | null> => {
  try {
    let locationQuery = state;
    if (zipCode) {
      locationQuery = `${zipCode}, ${state}`;
    }
    
    const prompt = `Use search to find the average property tax rate for ${locationQuery}. If possible, also find county-specific rates for this location. Return only a JSON object with this structure:
    {
      "state": "${state}",
      "average_rate": "", 
      "county_rate": ""
    }`;

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/" + MODEL_NAME + ":generateContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.1,
          topK: 32,
          topP: 1,
          maxOutputTokens: 2048,
        },
        tools: [{
          googleSearchRetrieval: {}
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the JSON from the response text
    const responseText = data.candidates[0].content.parts[0].text;
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]) as PropertyTaxInfo;
    } else {
      throw new Error("Failed to parse response");
    }
  } catch (error) {
    console.error("Error fetching property tax rate:", error);
    return null;
  }
};

/**
 * Fetches estimated home insurance cost for a given location and home value
 */
export const fetchHomeInsuranceEstimate = async (
  state: string, 
  zipCode: string, 
  homeValue: number
): Promise<number | null> => {
  try {
    const prompt = `Use search to find the average annual home insurance cost for a ${homeValue} dollar home in ${zipCode}, ${state}. Return only a number representing the estimated annual cost in dollars.`;

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/" + MODEL_NAME + ":generateContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.1,
          topK: 32,
          topP: 1,
          maxOutputTokens: 2048,
        },
        tools: [{
          googleSearchRetrieval: {}
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const responseText = data.candidates[0].content.parts[0].text;
    
    // Try to extract a numeric value from the response
    const numericMatch = responseText.match(/\$?(\d{1,3}(,\d{3})*(\.\d+)?)/);
    if (numericMatch) {
      return parseFloat(numericMatch[1].replace(/,/g, ''));
    } else {
      throw new Error("Failed to extract insurance cost");
    }
  } catch (error) {
    console.error("Error fetching home insurance estimate:", error);
    return null;
  }
};

/**
 * Handles AI chat interactions with Gemini
 */
export const chatWithGemini = async (
  messages: Array<{role: string, content: string}>,
  useSearchGrounding: boolean = false
) => {
  try {
    const formattedMessages = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const requestBody: any = {
      contents: formattedMessages,
      generationConfig: {
        temperature: 0.7,
        topK: 32,
        topP: 1,
        maxOutputTokens: 4096,
      }
    };

    // Add search grounding if requested
    if (useSearchGrounding) {
      requestBody.tools = [{
        googleSearchRetrieval: {}
      }];
    }

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/" + MODEL_NAME + ":generateContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error chatting with Gemini:", error);
    return "I'm sorry, I encountered an error while processing your request. Please try again later.";
  }
};
