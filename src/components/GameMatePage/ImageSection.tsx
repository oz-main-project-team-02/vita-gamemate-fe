import { MateRegister } from '@/config/types';

type Props = {
  fileRef: React.MutableRefObject<HTMLInputElement | null>;
  setFormData: React.Dispatch<React.SetStateAction<MateRegister>>;
  setPreviewImage: React.Dispatch<React.SetStateAction<string | null>>;
  previewImage: string | null;
};

export default function ImageSection({ fileRef, setFormData, setPreviewImage, previewImage }: Props) {
  // 파일변경시 이미지 프리뷰
  const handleChangeFile = () => {
    if (fileRef.current?.files?.[0]) {
      const file = fileRef.current.files[0];
      const imageUrl = URL.createObjectURL(file);

      setFormData((prev) => ({ ...prev, image: imageUrl }));
      setPreviewImage(imageUrl);
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col'>
        <h2 className='text-xl font-semibold'>스크린샷 업로드</h2>
        <p className='text-gray-400'>본인의 실력을 보여줄 수 있는 사진을 업로드 해주세요.</p>
      </div>
      <div className='relative flex h-72 items-center justify-center rounded-xl bg-white outline outline-gray-200'>
        <input type='file' ref={fileRef} id='file' className='hidden' onChange={handleChangeFile} />
        <label htmlFor='file' className='absolute cursor-pointer px-20 py-6 text-3xl text-gray-300'>
          +
        </label>
        {previewImage && <img src={previewImage} className='h-full object-cover' />}
      </div>
    </div>
  );
}
