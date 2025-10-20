"use client";

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Heart, TrendingUp, IndianRupee, Clock } from 'lucide-react';

export default function StatsSection() {
  const { t } = useLanguage();

  const stats = [
    {
      icon: Heart,
      value: '500+',
      label: t('stats.petsHelped'),
      color: '#E2725B'
    },
    {
      icon: TrendingUp,
      value: '95%',
      label: t('stats.successRate'),
      color: '#4CAF50'
    },
    {
      icon: IndianRupee,
      value: '₹8,000',
      label: t('stats.avgCost'),
      color: '#FF9800'
    },
    {
      icon: Clock,
      value: '7-10',
      label: t('stats.daysToFit'),
      color: '#2196F3'
    }
  ];

  return (
    <section className="bg-white py-16 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <Icon className="w-8 h-8" style={{ color: stat.color }} />
                  </div>
                </div>
                <p 
                  className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {stat.value}
                </p>
                <p className="text-sm sm:text-base text-gray-600 font-medium">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}