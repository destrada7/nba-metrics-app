import React, { useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';

const DataFetcher = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading state to true while fetching data
      try {
        const response = await fetch(
          `http://localhost:3001/api/players?page=${currentPage}&limit=100`
        );
        const jsonData = await response.json();
        setData(jsonData.players);
        setTotalPages(jsonData.totalPages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false); // Set loading state to false after data is fetched
    };

    fetchData();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const getToolTipContent = (item) => {
    return (
      <div>
        <ul>
          <li>
            <span>Jugador: </span>
            <span>{item.Jugador}</span>
          </li>
          <li>
            <span>Equipo: </span>
            <span>{item.Equipo}</span>
          </li>
          <li>
            <span>Arquetipo Ofensivo: </span>
            <span>{item['Arquetipo Ofensivo']}</span>
          </li>
          <li>
            <span>Arquetipo Defensivo: </span>
            <span>{item['Arquetipo Defensivo']}</span>
          </li>
          <li>
            <span>POISE Ofensivo: </span>
            <span>{item['POISE Ofensivo']}</span>
          </li>
          <li>
            <span>POISE Defensivo: </span>
            <span>{item['POISE Defensivo']}</span>
          </li>
          <li>
            <span>POISE Total: </span>
            <span>{item['POISE Total']}</span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div className="p-4">
      <div className="overflow-auto h-full">
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : (
          <>
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border border-gray-300">Jugador</th>
                  <th className="p-2 border border-gray-300">Equipo</th>
                  <th className="p-2 border border-gray-300">
                    Arquetipo Ofensivo
                  </th>
                  <th className="p-2 border border-gray-300">
                    Arquetipo Defensivo
                  </th>
                  <th className="p-2 border border-gray-300">POISE Ofensivo</th>
                  <th className="p-2 border border-gray-300">
                    POISE Defensivo
                  </th>
                  <th className="p-2 border border-gray-300">POISE Total</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="bg-white">
                    <td
                      className="p-2 border border-gray-300"
                      data-tooltip-id={`my-tooltip-inline-${index}`}
                    >
                      {item.Jugador}
                    </td>
                    <td
                      className="p-2 border border-gray-300"
                      data-tooltip-id={`my-tooltip-inline-${index}`}
                    >
                      {item.Equipo}
                    </td>
                    <td
                      className="p-2 border border-gray-300"
                      data-tooltip-id={`my-tooltip-inline-${index}`}
                    >
                      {item['Arquetipo Ofensivo']}
                    </td>
                    <td
                      className="p-2 border border-gray-300"
                      data-tooltip-id={`my-tooltip-inline-${index}`}
                    >
                      {item['Arquetipo Defensivo']}
                    </td>
                    <td
                      className="p-2 border border-gray-300"
                      data-tooltip-id={`my-tooltip-inline-${index}`}
                    >
                      {item['POISE Ofensivo']}
                    </td>
                    <td
                      className="p-2 border border-gray-300"
                      data-tooltip-id={`my-tooltip-inline-${index}`}
                    >
                      {item['POISE Defensivo']}
                    </td>
                    <td
                      className="p-2 border border-gray-300"
                      data-tooltip-id={`my-tooltip-inline-${index}`}
                    >
                      {item['POISE Total']}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex justify-between items-center">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="text-gray-600">
                {currentPage} of {totalPages}
              </span>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
      {data.map((item, index) => (
        <Tooltip
          key={index}
          id={`my-tooltip-inline-${index}`}
          style={{ backgroundColor: 'purple', color: '#FFF' }}
        >
          {getToolTipContent(item)}
        </Tooltip>
      ))}
    </div>
  );
};

export default DataFetcher;