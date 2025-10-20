"use client";

import { useState } from 'react';
import ClientLayout from '@/components/ClientLayout';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

export default function SuccessStoriesPage() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'dog' | 'cat' | 'bird'>('all');

  const stories = [
    {
      id: 1,
      name: 'Alita',
      species: 'dog',
      age: '3 years',
      injury: 'Front leg amputation due to accident',
      location: 'Mumbai, Maharashtra',
      beforeImage: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&q=80',
      afterImage: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80',
      story: 'Alita was hit by a car and lost her front leg. After getting her prosthetic, she can now run and play with other dogs again. Her transformation has been incredible!',
      videoUrl: '#'
    },
    {
      id: 2,
      name: 'Raja',
      species: 'dog',
      age: '5 years',
      injury: 'Back leg deformity from birth',
      location: 'Delhi, NCR',
      beforeImage: 'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=600&q=80',
      afterImage: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&q=80',
      story: 'Born with a leg deformity, Raja struggled to walk. With his custom 3D-printed prosthetic, he now walks confidently and enjoys daily walks in the park.',
      videoUrl: '#'
    },
    {
      id: 3,
      name: 'Mimi',
      species: 'cat',
      age: '2 years',
      injury: 'Leg infection requiring amputation',
      location: 'Bengaluru, Karnataka',
      beforeImage: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80',
      afterImage: 'https://images.unsplash.com/photo-1573865526739-10c1dd7e1e0e?w=600&q=80',
      story: 'Mimi suffered a severe infection that required amputation. Her prosthetic allows her to climb, jump, and play just like any other cat.',
      videoUrl: '#'
    },
    {
      id: 4,
      name: 'Bruno',
      species: 'dog',
      age: '4 years',
      injury: 'Front leg injury from fall',
      location: 'Pune, Maharashtra',
      beforeImage: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&q=80',
      afterImage: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=600&q=80',
      story: 'Bruno fell from a height and damaged his front leg beyond repair. Today, with his prosthetic, he is back to being the energetic dog his family loves.',
      videoUrl: '#'
    },
    {
      id: 5,
      name: 'Tweety',
      species: 'bird',
      age: '1 year',
      injury: 'Leg damaged by predator attack',
      location: 'Chennai, Tamil Nadu',
      beforeImage: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&q=80',
      afterImage: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&q=80',
      story: 'Tweety lost her leg to a predator. With a lightweight 3D-printed prosthetic, she can now perch and hop around her aviary comfortably.',
      videoUrl: '#'
    },
    {
      id: 6,
      name: 'Simba',
      species: 'cat',
      age: '3 years',
      injury: 'Back leg paralysis from accident',
      location: 'Hyderabad, Telangana',
      beforeImage: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=600&q=80',
      afterImage: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&q=80',
      story: 'After a road accident left Simba paralyzed, we designed a special mobility aid. Now he can move independently and even play with toys!',
      videoUrl: '#'
    }
  ];

  const filteredStories = filter === 'all' 
    ? stories 
    : stories.filter(story => story.species === filter);

  return (
    <ClientLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#E2725B]/10 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {t('stories.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('stories.subtitle')}
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { key: 'all', label: t('stories.filter.all') },
              { key: 'dog', label: t('stories.filter.dog') },
              { key: 'cat', label: t('stories.filter.cat') },
              { key: 'bird', label: t('stories.filter.bird') }
            ].map((item) => (
              <Button
                key={item.key}
                onClick={() => setFilter(item.key as any)}
                variant={filter === item.key ? 'default' : 'outline'}
                className={filter === item.key ? 'bg-[#4CAF50] hover:bg-[#45a049]' : ''}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStories.map((story) => (
              <div key={story.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
                {/* Before/After Images */}
                <div className="relative h-64">
                  <div className="grid grid-cols-2 h-full">
                    <div className="relative">
                      <img
                        src={story.beforeImage}
                        alt={`${story.name} before`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        Before
                      </div>
                    </div>
                    <div className="relative">
                      <img
                        src={story.afterImage}
                        alt={`${story.name} after`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-[#4CAF50] text-white text-xs px-2 py-1 rounded">
                        After
                      </div>
                    </div>
                  </div>
                  
                  {/* Play Button Overlay */}
                  <button className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-[#4CAF50] ml-1" />
                    </div>
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {story.name}
                    </h3>
                    <span className="text-xs bg-[#4CAF50]/10 text-[#4CAF50] px-3 py-1 rounded-full font-semibold uppercase">
                      {story.species}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p><strong>Age:</strong> {story.age}</p>
                    <p><strong>Location:</strong> {story.location}</p>
                    <p><strong>Injury:</strong> {story.injury}</p>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed">
                    {story.story}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#E2725B] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Your Pet Could Be Next!
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Every story starts with a consultation. Let us help your pet live their best life.
          </p>
          <Button size="lg" className="bg-white text-[#E2725B] hover:bg-gray-100 font-semibold px-8 py-6">
            Start Your Pet's Journey
          </Button>
        </div>
      </section>

      <WhatsAppWidget />
    </ClientLayout>
  );
}