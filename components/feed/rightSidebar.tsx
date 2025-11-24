'use client';

import React from 'react';
import Image from 'next/image';
import { Search, MoreHorizontal, Check } from 'lucide-react';

export default function RightSidebar() {
  const mightLike = [
    {
      id: 1,
      name: 'Radoovan SkillArena',
      title: 'Founder & CEO at Trophy',
      avatar: '/images/f8.png',
      mutual: 12,
    },
  ];

  const friends = [
    { id: 1, name: 'Steve Jobs', title: 'CEO of Apple', avatar: '/images/f4.png', time: '5 minute ago', online: false },
    { id: 2, name: 'Ryan Roslansky', title: 'CEO of LinkedIn', avatar: '/images/f7.png', online: true },
    { id: 3, name: 'Dylan Field', title: 'CEO of Figma', avatar: '/images/f3.png', online: true },
    { id: 4, name: 'Steve Jobs', title: 'CEO of Apple', avatar: '/images/f1.png', time: '5 minute ago', online: false },
    { id: 5, name: 'Ryan Roslansky', title: 'CEO of LinkedIn', avatar: '/images/f4.png', online: true },
    { id: 6, name: 'Dylan Field', title: 'CEO of Figma', avatar: '/images/f5.png', online: false },
  ];

  return (
    <div className="hidden lg:block w-72 xl:w-72 pb-6">
      <div className="px-4 space-y-6">

        {/* You Might Like */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-900">You Might Like</h2>
            <button className="text-sm text-blue-600 hover:underline font-medium">See All</button>
          </div>

          <div className="space-y-4">
            {mightLike.map((person) => (
              <div key={person.id} className="flex items-center justify-between flex-col">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300">
                    <Image
                      src={person.avatar}
                      alt={person.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{person.name}</h3>
                    <p className="text-xs text-gray-600">{person.title}</p>
                    {person.mutual && (
                      <p className="text-xs text-gray-500 mt-0.5">{person.mutual} mutual connections</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition">
                    Ignore
                  </button>
                  <button className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    Follow
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Your Friends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-900">Your Friends</h2>
            <button className="text-sm text-blue-600 hover:underline font-medium">See All</button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-5">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="input search text"
              className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
            />
          </div>

          {/* Friends List */}
          <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-tra scrollbar-hide">
            {friends.map((friend) => (
              <div key={friend.id} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300">
                      <Image
                        src={friend.avatar}
                        alt={friend.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {friend.online && (
                      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{friend.name}</h3>
                    <p className="text-xs text-gray-600">{friend.title}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                  {friend.time && (
                    <span className="text-xs text-gray-500">{friend.time}</span>
                  )}
                  <button className="p-1.5 hover:bg-gray-100 rounded-full transition">
                    <MoreHorizontal className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}