export default function GetAllImagesArray(
  titleImage: File,
  otherImages: FileList | null
) {
  const filesArray = [];

  filesArray.push([titleImage.name, titleImage.type]);

  if (otherImages) {
    for (const file of Array.from(otherImages)) {
      filesArray.push([file?.name, file?.type]);
    }
  }

  return filesArray;
}
