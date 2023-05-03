import { useTable} from 'react-table';
import { db } from '../../config'
import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState,useMemo } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../config'



const Dashboard = () => 
{
    const [user] = useAuthState(auth);

    type user = {
        name: string;
        email: string;
        photoURL: string;
        uid: string;
        lastSeen: string;
    };

    type ColumnDef<T extends object> = {
        Header: string;
        accessor: keyof T;
    };
    
    const columns: ColumnDef<user>[] = useMemo(
        () => [
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Email",
                accessor: "email",
            },
            {
                Header: "Photo",
                accessor: "photoURL",
            },
            {
                Header: "Uid",
                accessor: "uid",
            },
            {
                Header: "LastSeen",
                accessor: "lastSeen",
            },
        ],
        []
    );

    type data = {
        name: string;
        email: string;
        photoURL: string;
        uid: string;
        lastSeen: string;
    }

    const [data, setData] = useState<data[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const data = await getDocs(collection(db, "users"));
            setData(data.docs.map((doc) => doc.data() as data));
            setLoading(false);
        };
        getData();
    }
    , []);

    const tableInstance = useTable({ columns, data });
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;

    return (
        <div>
            <h1>Dashboard</h1>
            <table {...getTableProps()} className="table-auto">
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-200 dark:bg-gray-800">
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps()}
                                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200 dark:bg-gray-800">
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td
                                        {...cell.getCellProps()}
                                        className="px-4 py-2 whitespace-nowrap"
                                    >
                                        {cell.render("Cell")}
                                    </td>
                                ))}
                            </tr>
                        );
                    }
                    )}
                </tbody>
            </table>
        </div>
    );


    
}
export default Dashboard;