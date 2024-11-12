export async function fetchImageUrls(maxImages: number): Promise<string[]> {
    const baseUrl = 'https://www.serebii.net/tcgpocket/geneticapex/';
    const imageUrls: string[] = [];
  
    for (let i = 1; i <= maxImages; i++) {
      const imageUrl = `${baseUrl}${i}.jpg`;
      imageUrls.push(imageUrl);
    }
  
    return imageUrls;
  }
  