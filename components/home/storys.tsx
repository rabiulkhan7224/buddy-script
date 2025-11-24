import Image from 'next/image';
import React from 'react';

const Stories = () => {
  const stories = [
    {
      id: 1,
      name: 'Your Story',
      userProfile: '/images/chat_profile.png', // your profile pic
      isYourStory: true,
    },
    {
      id: 2,
      name: 'Ryan Roslansky',
      userProfile: '/images/chat1_img.png',
      image: '/images/card_ppl1.png',
    },
    {
      id: 3,
      name: 'Ryan Roslansky',
      userProfile: '/images/chat2_img.png',
      image: '/images/card_ppl2.png',
    },
    {
      id: 4,
      name: 'Ryan Roslansky',
      userProfile: '/images/chat3_img.png',
      image: '/images/card_ppl4.png',
    },
    {
      id: 6,
      name: 'Ryan Roslansky',
      userProfile: '/images/chat5_img.png',
      image: '/images/card_ppl3.png',
    },
    {
      id: 5,
      name: 'Ryan Roslansky',
      userProfile: '/images/chat5_img.png',
      image: '/images/card_ppl3.png',
    },
  ];

return (
    <div className="bg-white border-b border-gray-200">
      <div className="flex items-center space-x-4 overflow-x-auto p-4 px-4 scrollbar-hide">
        {/* Your Story */}
        <div className="flex-shrink-0 text-center">
          <div className="relative">
            {/* Mobile: Circle | Desktop: Rectangle */}
            <div className="w-16 h-16 lg:w-20 lg:h-32 rounded-full lg:rounded-xl overflow-hidden bg-gray-200 ring-2 ring-gray-300 lg:ring-0">
              <Image
                src={stories[0].userProfile}
                alt="Your story"
                width={80}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>

            {/* + Button */}
            <button className="absolute bottom-0 right-0 lg:bottom-6 lg:left-1/2 lg:-translate-x-1/2 w-7 h-7 lg:w-10 lg:h-10 bg-blue-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg text-white font-bold text-lg">
              +
            </button>
          </div>
          <p className="text-xs mt-1.5 text-gray-700 font-medium">Your Story</p>
        </div>

        {/* Other Users' Stories */}
        {stories.slice(1).map((story) => (
          <div
            key={story.id}
            className="flex-shrink-0 text-center cursor-pointer group"
          >
            <div className="relative">
              {/* Story Image - Circle on mobile, Rectangle on desktop */}
              <div className="w-16 h-16 lg:w-20 lg:h-32 rounded-full lg:rounded-xl overflow-hidden ring-4  group-hover:ring-opacity-100 transition-all">
                <Image
                  src={story.image!}
                  alt={story.name}
                  width={80}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Profile Pic - Only on Desktop */}
              <div className="absolute -top-3 -left-3 hidden lg:block">
                <div className="w-10 h-10 rounded-full border-4 border-white overflow-hidden shadow-lg ring-2 ring-purple-500">
                  <Image
                    src={story.userProfile}
                    alt={story.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Name - Truncated */}
            <p className="text-xs mt-1.5 text-gray-600 max-w-16 lg:max-w-20 truncate">
              {story.name.length > 10 ? story.name.slice(0, 8) + '...' : story.name}
            </p>
          </div>
        ))}

        {/* Right Arrow Indicator */}
        {/* <div className="flex-shrink-0 pl-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-600 text-xl">Right Arrow</span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Stories;