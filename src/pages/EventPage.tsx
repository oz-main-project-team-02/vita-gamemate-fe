import { fetchGameMateProfiles } from '@/api/mate';
import lol from '@/assets/imgs/event1.png';
import overwatch from '@/assets/imgs/event2.png';
import tft from '@/assets/imgs/event3.png';
import bg from '@/assets/imgs/event4.png';
import ambassador from '@/assets/imgs/ambassador.png';
import VitaPrice from '@/components/Common/VitaPrice';
import { getGame } from '@/config/const';
import { User } from '@/config/types';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SkeletonTodayGameMate from '@/components/skeleton/SkeletonTodayGameMate';
import userImage from '@/assets/imgs/user.png';

export default function EventPage() {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchGameMateProfiles({ gameId: eventId, sortValue: 'recommendation', pageParam: 1 });
        console.log(data);
        setEventData(data?.results);
        setIsLoading(true);
      } catch (err) {
        console.error(err);
      }
    };
    const fetchId = setTimeout(() => {
      fetchData();
    }, 1000);
    return () => clearTimeout(fetchId);
  }, [eventId]);

  const eventImg = (eventId: string) => {
    switch (eventId) {
      case '1':
        return lol;
      case '2':
        return overwatch;
      case '3':
        return tft;
      case '4':
        return bg;
      default:
        break;
    }
  };

  console.log(eventData.slice(0, 10));

  return (
    <div className='flex flex-col items-center'>
      <div className='relative flex w-full flex-col items-center justify-center'>
        <img className='mx-auto w-full object-cover' src={eventImg(eventId!)} alt='eventImg' />
      </div>
      {!isLoading ? (
        Array.from({ length: 10 }).map((_, index) => (
          <div className='my-[25px]' key={index}>
            <SkeletonTodayGameMate />
          </div>
        ))
      ) : (
        <div className='mb-[100px] mt-[50px] w-[200px] md:w-[300px] lg:w-[500px] xl:w-[620px]'>
          {eventData?.slice(0, 10).map((mate) => (
            <Link
              to={`/user/${mate.id}`}
              className='relative my-[25px] flex h-[300px] w-[200px] flex-col gap-3 rounded-3xl bg-[#FFFFFF] p-3 md:w-[300px] lg:h-[206px] lg:w-[500px] lg:flex-row xl:w-[620px]'
              style={{ boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.4)' }}
            >
              <div className='mx-auto h-[150px] w-[150px] overflow-hidden rounded-xl bg-blue-500 xl:h-[186px] xl:w-[186px]'>
                <img
                  src={mate.profile_image ? mate.profile_image : userImage}
                  alt='사용자 이미지'
                  className='h-[150px] w-[150px] overflow-hidden transition-transform duration-200 hover:scale-125 xl:h-[186px] xl:w-[186px]'
                />
              </div>
              <div className='flex flex-1 flex-col px-2 lg:py-3'>
                <h2 className='mb-1 text-lg font-bold xl:text-2xl'>{mate.nickname}</h2>
                <div className='flex items-center'>
                  <img className='w-6' src={ambassador} alt='ambassador' />
                  <p className='mx-1 font-medium'>비타 앰버서더</p>
                </div>
                <div className='my-1 hidden w-[280px] flex-1 truncate text-sm font-light text-[#444444] lg:block xl:w-[400px] xl:text-base'>
                  {mate.description}
                </div>
                <div className='flex gap-4'>
                  <img
                    src={getGame(mate.mate_game_info?.[0].game_id)?.img}
                    alt='게임 이미지'
                    className='hidden h-[60px] w-[60px] rounded-xl bg-primary lg:block'
                  />
                  <div className='flex flex-col justify-center'>
                    <h2 className='text-base font-bold xl:text-2xl'>
                      {getGame(mate.mate_game_info?.[0].game_id)?.title}
                    </h2>
                    <VitaPrice mate={mate} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
