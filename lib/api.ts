export async function fetchData({
  endpoint,
  tags,
}: {
  endpoint: string
  tags: string
}) {
  const options: RequestInit = {
    next: {
      revalidate: 3600,
      tags: [`${tags}`],
    },
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/${endpoint}`,
      options
    )
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return response.json()
  } catch (error) {
    console.log("Fetching data failed", error)
    throw error
  }
}
