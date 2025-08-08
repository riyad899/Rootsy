import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, parseISO } from 'date-fns';
import { toast } from 'react-toastify';

const plantingData = [
  { id: 1, name: 'Tomatoes', type: 'Vegetable', plantDate: '2023-03-15', harvestDate: '2023-07-20' },
  { id: 2, name: 'Basil', type: 'Herb', plantDate: '2023-04-01', harvestDate: '2023-08-30' },
  { id: 3, name: 'Zucchini', type: 'Vegetable', plantDate: '2023-05-10', harvestDate: '2023-08-15' },
  { id: 4, name: 'Strawberries', type: 'Fruit', plantDate: '2023-04-20', harvestDate: '2023-07-10' },
  { id: 5, name: 'Lavender', type: 'Herb', plantDate: '2023-03-01', harvestDate: '2023-08-01' },
  { id: 6, name: 'Peppers', type: 'Vegetable', plantDate: '2023-05-05', harvestDate: '2023-09-15' },
];

const plantingGuide = {
  1: [{ name: 'Onions (sets)', type: 'Vegetable' }, { name: 'Garlic', type: 'Vegetable' }],
  2: [{ name: 'Broad Beans', type: 'Vegetable' }, { name: 'Peas', type: 'Vegetable' }],
  3: [{ name: 'Tomatoes (indoors)', type: 'Vegetable' }, { name: 'Lettuce', type: 'Vegetable' }, { name: 'Spinach', type: 'Vegetable' }],
  4: [{ name: 'Carrots', type: 'Vegetable' }, { name: 'Beets', type: 'Vegetable' }, { name: 'Radishes', type: 'Vegetable' }],
  5: [{ name: 'Cucumbers', type: 'Vegetable' }, { name: 'Zucchini', type: 'Vegetable' }, { name: 'Corn', type: 'Vegetable' }],
  6: [{ name: 'Green Beans', type: 'Vegetable' }, { name: 'Pumpkins', type: 'Vegetable' }],
  7: [{ name: 'Kale', type: 'Vegetable' }, { name: 'Broccoli', type: 'Vegetable' }],
  8: [{ name: 'Swiss Chard', type: 'Vegetable' }, { name: 'Brussels Sprouts', type: 'Vegetable' }],
  9: [{ name: 'Winter Lettuce', type: 'Vegetable' }, { name: 'Arugula', type: 'Vegetable' }],
  10: [{ name: 'Garlic (for next year)', type: 'Vegetable' }],
  11: [],
  12: [],
};

const plantTypeColors = {
  'Vegetable': 'bg-green-100 text-green-800',
  'Fruit': 'bg-purple-100 text-purple-800',
  'Herb': 'bg-blue-100 text-blue-800',
  'Flower': 'bg-pink-100 text-pink-800'
};

export const GardeningCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // 'month' or 'year'
  const [selectedPlant, setSelectedPlant] = useState(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const resetToToday = () => setCurrentDate(new Date());

  const getPlantsForDate = (date) => {
    return plantingData.filter(plant => {
      const plantDate = parseISO(plant.plantDate);
      return isSameDay(plantDate, date);
    });
  };

  const getRecommendedPlants = () => {
    const month = currentDate.getMonth() + 1;
    return plantingGuide[month] || [];
  };

  const calculateGrowthProgress = (plant) => {
    const now = new Date();
    const plantDate = parseISO(plant.plantDate);
    const harvestDate = parseISO(plant.harvestDate);

    const totalDuration = harvestDate - plantDate;
    const elapsedDuration = now - plantDate;

    if (totalDuration <= 0) return 100;
    if (elapsedDuration <= 0) return 0;

    return Math.min(100, (elapsedDuration / totalDuration) * 100);
  };

  const handleViewCareInstructions = (plant) => {
    toast.info(`Care instructions for ${plant.name} coming soon!`);
    setSelectedPlant(null);
  };

  const renderMonthView = () => {
    const startDay = monthStart.getDay();
    const endDay = monthEnd.getDay();
    const totalCells = startDay + monthDays.length + (6 - endDay);
    const rowsNeeded = Math.ceil(totalCells / 7);
    const emptyEndCells = (rowsNeeded * 7) - (startDay + monthDays.length);

    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 bg-[#089579] text-white flex justify-between items-center">
          <button onClick={prevMonth} className="p-2 rounded-full hover:bg-[#067a60]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <h2 className="text-xl font-semibold">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <button onClick={nextMonth} className="p-2 rounded-full hover:bg-[#067a60]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="bg-gray-100 py-2 text-center font-medium text-gray-700">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {Array.from({ length: startDay }).map((_, index) => (
            <div key={`empty-start-${index}`} className="bg-white h-24" />
          ))}

          {monthDays.map(day => {
            const dayPlants = getPlantsForDate(day);
            const isToday = isSameDay(day, new Date());

            return (
              <div
                key={day.toString()}
                className={`bg-white h-24 p-1 overflow-y-auto ${isToday ? 'border-2 border-[#089579]' : ''}`}
              >
                <div className={`text-right ${isToday ? 'font-bold text-[#089579]' : ''}`}>
                  {format(day, 'd')}
                </div>
                <div className="mt-1 space-y-1">
                  {dayPlants.map(plant => (
                    <div
                      key={`${plant.id}-${plant.name}`}
                      className={`text-xs p-1 rounded truncate cursor-pointer ${plantTypeColors[plant.type]}`}
                      onClick={() => setSelectedPlant(plant)}
                    >
                      {plant.name}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {Array.from({ length: emptyEndCells }).map((_, index) => (
            <div key={`empty-end-${index}`} className="bg-white h-24" />
          ))}
        </div>
      </div>
    );
  };

  const renderYearView = () => {
    const months = Array.from({ length: 12 }, (_, i) => new Date(currentDate.getFullYear(), i, 1));

    return (
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#089579]">
            {currentDate.getFullYear()}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentDate(subMonths(currentDate, 12))}
              className="p-2 text-[#089579] hover:bg-gray-100 rounded"
            >
              Previous Year
            </button>
            <button
              onClick={() => setCurrentDate(addMonths(currentDate, 12))}
              className="p-2 text-[#089579] hover:bg-gray-100 rounded"
            >
              Next Year
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {months.map(month => {
            const monthPlants = plantingGuide[month.getMonth() + 1] || [];

            return (
              <div key={month.toString()} className="border rounded-lg p-3 hover:shadow-md transition">
                <h3 className="font-medium text-lg mb-2 text-[#089579]">
                  {format(month, 'MMMM')}
                </h3>
                {monthPlants.length > 0 ? (
                  <ul className="space-y-1">
                    {monthPlants.map((plant, index) => (
                      <li key={`${index}-${plant.name}`} className="flex items-center">
                        <span className={`text-xs px-2 py-1 rounded-full mr-2 ${plantTypeColors[plant.type]}`}>
                          {plant.type.charAt(0)}
                        </span>
                        <span>{plant.name}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm">No recommended plantings this month</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#089579]">Gardening Calendar</h1>
        <div className="flex space-x-4">
          <button
            onClick={resetToToday}
            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            Today
          </button>
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setView('month')}
              className={`px-4 py-2 rounded-l-lg ${view === 'month' ? 'bg-[#089579] text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              Month View
            </button>
            <button
              onClick={() => setView('year')}
              className={`px-4 py-2 rounded-r-lg ${view === 'year' ? 'bg-[#089579] text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              Year View
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={view === 'month' ? 'lg:col-span-2' : 'lg:col-span-3'}>
          {view === 'month' ? renderMonthView() : renderYearView()}
        </div>

        {view === 'month' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h2 className="text-xl font-semibold mb-3 text-[#089579]">Recommended for {format(currentDate, 'MMMM')}</h2>
              <ul className="space-y-2">
                {getRecommendedPlants().map((plant, index) => (
                  <li key={`${index}-${plant.name}`} className="flex items-start">
                    <span className={`text-xs px-2 py-1 rounded-full mr-3 mt-1 ${plantTypeColors[plant.type]}`}>
                      {plant.type.charAt(0)}
                    </span>
                    <div>
                      <p className="font-medium">{plant.name}</p>
                      <p className="text-sm text-gray-600">{plant.type}</p>
                    </div>
                  </li>
                ))}
              </ul>
              {getRecommendedPlants().length === 0 && (
                <p className="text-gray-500">No recommended plantings for this month</p>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-lg p-4">
              <h2 className="text-xl font-semibold mb-3 text-[#089579]">Planting Tips</h2>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <h3 className="font-medium text-green-800">Soil Preparation</h3>
                  <p className="text-sm text-green-700">Add compost to your soil 2-3 weeks before planting to improve fertility.</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-800">Watering</h3>
                  <p className="text-sm text-blue-700">Water deeply but less frequently to encourage strong root growth.</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <h3 className="font-medium text-yellow-800">Sunlight</h3>
                  <p className="text-sm text-yellow-700">Most vegetables need 6-8 hours of direct sunlight per day.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedPlant && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-[#089579]">{selectedPlant.name}</h2>
                <button
                  onClick={() => setSelectedPlant(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-4">
                <span className={`px-3 py-1 rounded-full text-sm ${plantTypeColors[selectedPlant.type]}`}>
                  {selectedPlant.type}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Planted on</p>
                  <p className="font-medium">{format(parseISO(selectedPlant.plantDate), 'MMMM d, yyyy')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Harvest by</p>
                  <p className="font-medium">{format(parseISO(selectedPlant.harvestDate), 'MMMM d, yyyy')}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-500">Growth Progress</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-[#089579] h-2.5 rounded-full"
                    style={{ width: `${calculateGrowthProgress(selectedPlant)}%` }}>
                  </div>
                </div>
              </div>

              <button
                className="w-full bg-[#089579] text-white py-2 rounded-lg hover:bg-[#067a60] transition"
                onClick={() => handleViewCareInstructions(selectedPlant)}
              >
                View Care Instructions
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};