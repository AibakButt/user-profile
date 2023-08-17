import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_USERS } from '@/graphql/users/queries';
import Loader from './Loading';

type User = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  linkedIn: string;
  company: string;
}

function UserTable() {
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<Array<User>>([])
  const [totalUsers, setTotalUsers] = useState(0)

  const PAGE_SIZE = 25

  const [runQuery, { loading }] = useLazyQuery(GET_USERS,{
    variables: {
      page: currentPage,
      limit: PAGE_SIZE,
      searchQuery: searchQuery,
    }
  });

  const handleFetch = async () => {
    const { data } = await runQuery({
      variables: {
        page: currentPage,
        limit: PAGE_SIZE,
        searchQuery: searchQuery,
      }
    });
    data?.getUsers?.users && setUsers(data.getUsers.users)
    data?.getUsers?.totalCount && setTotalUsers(data.getUsers.totalCount)
  };

  useEffect(() => {
    async function fetchUsers() {
      const { data } = await runQuery()
      data?.getUsers?.users && setUsers(data.getUsers.users)
      data?.getUsers?.totalCount && setTotalUsers(data.getUsers.totalCount)
    }
    fetchUsers()

  }, [runQuery])

  const totalPages = Math.ceil(totalUsers / PAGE_SIZE);

  const handleSort = async (field: string) => {
    let response = null
    
    if (field === sortField) {
      response = await runQuery({
        variables: {
          sortOrder: sortOrder * -1,
          sortField: field,
        }
      })
      setSortOrder(sortOrder * -1);
    } else {
      response = await runQuery({
        variables: {
          sortOrder: 1,
          sortField: field,
        }
      })
      setSortField(field);
      setSortOrder(1);
    }
    response?.data?.getUsers?.users && setUsers(response.data.getUsers.users)
    response?.data?.getUsers?.totalCount && setTotalUsers(response.data.getUsers.totalCount)
  };
  const handlePageChange = async (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      const { data } = await runQuery({
        variables: {
          page: currentPage,
          limit: PAGE_SIZE,
        }
      });
      data?.getUsers?.users && setUsers(data.getUsers.users)
      data?.getUsers?.totalCount && setTotalUsers(data.getUsers.totalCount)
    }
  };

  return (
    <div className="p-4">
      <div className="mb-6 flex">
        <input onChange={(e) => setSearchQuery(e.target.value)} type="Search" id="Search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Search" />
        <button onClick={() => handleFetch()} type="button" className="mx-1 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 ">Search</button>

      </div>
      <div className='flex justify-between'>
        <div>Total Records Found: {totalUsers}</div>
        {
          loading && <Loader />
        }
        <div className='text-lg'>
          Page No. {currentPage}
        </div>
      </div>
      <div className="relative overflow-x-auto">

        <table className="w-full text-md text-left ">
          <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="cursor-pointer " onClick={() => handleSort('name')}>
                Name
              </th>
              <th className="cursor-pointer" onClick={() => handleSort('email')}>
                Email
              </th>
              <th className="cursor-pointer" onClick={() => handleSort('phone')}>
                Phone
              </th>
              <th className="cursor-pointer" onClick={() => handleSort('linkedIn')}>
                LinkedIn
              </th>
              <th className="cursor-pointer" onClick={() => handleSort('company')}>
                Company
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user: User) => (
              <tr key={user._id} className="">
                <td className='bg-gray-50 dark:bg-gray-100'>{user.name}</td>
                <td>{user.email}</td>
                <td className='bg-gray-50 dark:bg-gray-100'>{user.phone}</td>
                <td>{user.linkedIn}</td>
                <td className='bg-gray-50 dark:bg-gray-100'>{user.company}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-center">
        <button
          className="px-4 py-2 border border-gray-300 rounded-md mx-1"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 border border-gray-300 rounded-md mx-1"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default UserTable;