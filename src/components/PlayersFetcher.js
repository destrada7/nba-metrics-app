import React, { useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import ReactDOMServer from 'react-dom/server';

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
          `http://localhost:3000/api/players?page=${currentPage}&limit=100`
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
    const jsxContent = (
      <div>
        <ul>
          <li>
            <span>POISE Total: </span>
            <span>{item['POISE Total']}</span>
          </li>
          <li>
            <span>Valor Scoring: </span>
            <span>{item['Valor Scoring']}</span>
          </li>
          <li>
            <span>Valor Spacing: </span>
            <span>{item['Valor Spacing']}</span>
          </li>

          <li>
            <span>Valor Passing: </span>
            <span>{item['Valor Passing']}</span>
          </li>

          <li>
            <span>Valor Rim Protection: </span>
            <span>{item['Valor Rim Protection']}</span>
          </li>

          <li>
            <span>Valor Rebounding: </span>
            <span>{item['Valor Rebounding']}</span>
          </li>
        </ul>
      </div>
    );

    const htmlString = ReactDOMServer.renderToString(jsxContent);

    return htmlString;
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
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="bg-white">
                    <td
                      className="p-2 border border-gray-300"
                      data-tooltip-id="my-tooltip-inline"
                      data-tooltip-html={`${getToolTipContent(item)}`}
                    >
                      {item.Jugador}
                    </td>
                    <td
                      className="p-2 border border-gray-300"
                      data-tooltip-id="my-tooltip-inline"
                      data-tooltip-html={getToolTipContent(item)}
                    >
                      {item.Equipo}
                    </td>
                    <td
                      className="p-2 border border-gray-300"
                      data-tooltip-id="my-tooltip-inline"
                      data-tooltip-html={getToolTipContent(item)}
                    >
                      {item['Arquetipo Ofensivo']}
                    </td>
                    <td
                      className="p-2 border border-gray-300"
                      data-tooltip-id="my-tooltip-inline"
                      data-tooltip-html={getToolTipContent(item)}
                    >
                      {item['Arquetipo Defensivo']}
                    </td>
                    <td
                      className="p-2 border border-gray-300"
                      data-tooltip-id="my-tooltip-inline"
                      data-tooltip-html={getToolTipContent(item)}
                    >
                      {item['POISE Ofensivo']}
                    </td>
                    <td
                      className="p-2 border border-gray-300"
                      data-tooltip-id="my-tooltip-inline"
                      data-tooltip-html={getToolTipContent(item)}
                    >
                      {item['POISE Defensivo']}
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
      <Tooltip
        id="my-tooltip-inline"
        style={{ backgroundColor: 'purple', color: '#FFF' }}
      />
    </div>
  );
};

export default DataFetcher;
