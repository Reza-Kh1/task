import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";
import { IconButton } from "@mui/material";
export default function Pagination({ total }: { total: number }) {
  const { search, pathname } = useLocation();
  let { page, ...other } = queryString.parse(search) as any;
  const searchQuery = new URLSearchParams(other);
  page = page || (1 as any);

  return (
    <div className="flex justify-between items-center mt-3">
      {
        page ?
          <Link
            to={
              pathname +
              `?page=${page.prevPage ? Number(page) - 1 : page}&${searchQuery}`
            }
          >
            <IconButton className="shadow-md !bg-[#6198f7]" disabled={page.prevPage ? false : true}>
              <FaAnglesRight size={22} color="#ededed" />
            </IconButton>
          </Link>
          :
          <IconButton disabled={true}>
            <FaAnglesRight size={22} />
          </IconButton>
      }
      <div className="flex gap-2 items-center justify-evenly">
        {Number(page) > 4 && (
          <>
            <Link to={`${pathname}?page=${1}&${searchQuery}`}>
              <IconButton size="small" className="shadow-md !px-4 !bg-[#6198f7]">
                <span className="text-gray-50 pt-1">
                  1
                </span>
              </IconButton>
            </Link>
            <span>...</span>
          </>
        )}
        {total
          ? Array.from(
            { length: Math.min(11, total - page + 1) },
            (_, i) => page + i
          ).map((i) => {
            return i === Number(page) ?
              <IconButton key={i} disabled={Number(page) === i} size="small" className={`!px-4 shadow-md ${i === Number(page) ? "!bg-[#9db4c8]" : "!bg-[#6198f7]"}`}>
                <span className="text-gray-50 pt-1">
                  {i}
                </span>
              </IconButton>
              :
              <Link to={`${pathname}?page=${i}&${searchQuery}`} key={i}>
                <IconButton disabled={Number(page) === i} size="small" className={`!px-4 shadow-md ${i === Number(page) ? "!bg-[#9db4c8]" : "!bg-[#6198f7]"}`}>
                  <span className="text-gray-50 pt-1">
                    {i}
                  </span>
                </IconButton>
              </Link>
          })
          : null}
        {page - Number(page) > 3 && (
          <>
            <span>...</span>
            <Link to={`${pathname}?page=${page}&${searchQuery}`}>
              <IconButton size="small" className="shadow-md !px-4 !bg-[#6198f7]">
                <span className="text-gray-50 pt-1">
                  {page}
                </span>
              </IconButton>
            </Link>
          </>
        )}
      </div>
      {

        <Link
          to={
            pathname +
            `?page=${page ? Number(page) + 1 : page}&${searchQuery}`
          }
        >
          <IconButton className="shadow-md !bg-[#6198f7]" disabled={page === 10 ? false : true}>
            <FaAnglesLeft size={22} color="#ededed" />
          </IconButton>
        </Link>

      }
    </div >
  );
}
