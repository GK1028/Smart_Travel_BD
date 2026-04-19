import { NextRequest, NextResponse } from "next/server"

const API_URL = "https://api.apifree.ai/v1/chat/completions"
const API_KEY = process.env.APIFREE_API_KEY || "sk-p3Ap519YKAQktGEBa5hm98YEmPbRW"

function generatePrompt({
  division,
  district,
  budget,
  duration,
  weatherInfo,
}: {
  division: string
  district: string
  budget: number
  duration: number
  weatherInfo?: string
}) {
  const weatherContext = weatherInfo ? `

========================
CURRENT WEATHER CONDITIONS
========================
${weatherInfo}

IMPORTANT: Consider the weather conditions when planning activities. If weather is unfavorable:
- Suggest indoor alternatives
- Warn about potential issues (rain, heat)
- Recommend appropriate timing for outdoor activities
` : ""

  return `You are a professional travel planner in Bangladesh.

Create a highly detailed ${duration}-day tour plan for ${district} District (${division} Division, Bangladesh) with a strict budget of ${budget} BDT per person.
${weatherContext}

========================
REQUIREMENTS
========================

1. Break the plan into Day 1, Day 2, Day 3 (or more if needed based on duration).
2. Include exact timelines:
   - Morning (সকাল)
   - Noon (দুপুর)
   - Afternoon (বিকাল)
   - Night (রাত)

3. Mention specific places to visit:
   - Popular tourist spots
   - Hidden/local attractions
   - Nature spots (haor, river, hills if available)

4. Transportation:
   - বাস, ট্রেন, CNG, রিকশা, নৌকা
   - Include estimated cost for each ride

5. Food suggestions:
   - Local খাবার
   - Estimated price per meal

6. Accommodation:
   - Budget hotel / guest house
   - Price range per night

7. Daily cost breakdown:
   - Transport
   - Food
   - Hotel
   - Entry tickets (if any)

8. TOTAL cost MUST stay within ${budget} BDT.

9. Add money-saving tips.

10. Add travel tips:
   - What to carry
   - Safety tips
   - Best time to visit

========================
STYLE
========================

- Use simple English + natural Bangla tone
- Make it beginner-friendly
- Use headings and bullet points
- Keep it practical and realistic
- Avoid generic advice, be specific

========================
GOAL
========================

Make the plan so clear that a person can follow it step-by-step without confusion.`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { division, district, budget, duration, weatherInfo } = body

    if (!division || !district || !budget || !duration) {
      return NextResponse.json(
        { error: "Missing required fields: division, district, budget, duration" },
        { status: 400 }
      )
    }

    const prompt = generatePrompt({ division, district, budget, duration, weatherInfo })

    console.log("[v0] Calling API with prompt for:", district, division)
    
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        max_tokens: 4096,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "openai/gpt-5.2",
        stream: false,
      }),
    })

    console.log("[v0] API Response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] API Error:", errorText)
      return NextResponse.json(
        { error: `Failed to generate travel plan: ${response.status}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log("[v0] API Response data:", JSON.stringify(data).substring(0, 500))
    
    // Check if API returned an error in the response body
    if (data.error || data.code) {
      console.error("[v0] API returned error in body:", data.error || data.code)
      return NextResponse.json(
        { error: `API Error: ${data.error || data.message || 'Unknown error'}` },
        { status: 400 }
      )
    }
    
    const generatedPlan = data.choices?.[0]?.message?.content || ""
    console.log("[v0] Generated plan length:", generatedPlan.length)
    
    if (!generatedPlan) {
      console.error("[v0] No plan content in response")
      return NextResponse.json(
        { error: "AI did not return a plan. Please try again." },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      plan: generatedPlan,
      meta: {
        division,
        district,
        budget,
        duration,
      },
    })
  } catch (error) {
    console.error("Error generating plan:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
