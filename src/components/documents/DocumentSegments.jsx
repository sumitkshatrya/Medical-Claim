import React from "react";
import Section from "../common/Section";
import { formatTitle } from "../../utils/formatters";

export default function DocumentSegments({ data, setPageNumber }) {
  const segments = data?.segments?.aggregated_segments || {};

  const getTotalPages = (pageRanges) => {
    return pageRanges.reduce((total, range) => {
      return total + (range.end - range.start + 1);
    }, 0);
  };

  if (Object.keys(segments).length === 0) {
    return (
      <Section title="Document Segments">
        <p className="text-gray-500 text-center py-4">No document segments available</p>
      </Section>
    );
  }

  return (
    <Section title="Document Segments">
      <div className="space-y-4">
        {Object.entries(segments)
          .sort((a, b) => {
            const aStart = a[1]?.page_ranges?.[0]?.start || 0;
            const bStart = b[1]?.page_ranges?.[0]?.start || 0;
            return aStart - bStart;
          })
          .map(([docType, value]) => {
            const pageRanges = value?.page_ranges || [];
            const totalPages = getTotalPages(pageRanges);

            if (pageRanges.length === 0) return null;

            return (
              <div key={docType} className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-gray-800">
                      {formatTitle(docType)}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {pageRanges.length} range{pageRanges.length > 1 ? 's' : ''}
                      </span>
                      <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                        {totalPages} page{totalPages > 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white">
                  <div className="flex flex-wrap gap-2">
                    {pageRanges.map((range, rangeIndex) => {
                      const pages = [];
                      for (let i = range.start; i <= range.end; i++) {
                        pages.push(i);
                      }

                      return (
                        <div key={rangeIndex} className="flex flex-wrap items-center gap-1">
                          {pages.map((page, pageIndex) => (
                            <React.Fragment key={page}>
                              {pageIndex > 0 && pages.length > 1 && (
                                <span className="text-xs text-gray-400">-</span>
                              )}
                              <button
                                onClick={() => setPageNumber?.(page)}
                                className={`
                                  px-3 py-1 text-sm rounded-md transition-all
                                  ${pageIndex === 0 ? 'font-medium' : ''}
                                  bg-gray-100 hover:bg-blue-600 hover:text-white
                                `}
                                title={`Go to page ${page}`}
                              >
                                {page}
                              </button>
                            </React.Fragment>
                          ))}
                          {rangeIndex < pageRanges.length - 1 && (
                            <span className="mx-2 text-gray-400">•</span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Quick Navigation */}
                  <div className="mt-3 pt-3 border-t flex items-center gap-2 text-xs text-gray-500">
                    <span className="font-medium">Quick jump:</span>
                    {pageRanges.map((range, index) => (
                      <button
                        key={`jump-${index}`}
                        onClick={() => setPageNumber?.(range.start)}
                        className="hover:text-blue-600 hover:underline"
                      >
                        P.{range.start}
                        {range.end > range.start && `-${range.end}`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </Section>
  );
}