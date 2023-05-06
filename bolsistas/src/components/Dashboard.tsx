import { useTable} from 'react-table';
import { db } from '../../config'
import { collection, deleteDoc, doc, getDocs, onSnapshot } from 'firebase/firestore'
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
        const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
            const users: data[] = snapshot.docs.map((doc) => ({
                name: doc.data().name,
                email: doc.data().email,
                photoURL: doc.data().photoURL,
                uid: doc.data().uid,
                lastSeen: new Date(doc.data().lastSeen.seconds * 1000).toString(),
            }));
            setData(users);
            setLoading(false);
        });
        return unsubscribe;
    }, []);


    const tableInstance = useTable({ columns, data });
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;

    
    const deletUserOnId = async (id: string) => {
        try {
        const userDocRef = doc(db, 'users', id);
        await deleteDoc(userDocRef);
        const user = auth.currentUser;
        await user?.delete();
        } catch (error) {
            console.error("Error removing document: ", error);
        }
    };

    const getUserIdOnClick = (id: string) => {
        deletUserOnId(id);
    }
    
    return (
    <main className='bg-gray-800 h-screen'>
        <div className='relative overflow-x-auto'>
            <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400' {...getTableProps()}>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th scope="col" className="px-6 py-3" {...column.getHeaderProps()}>{column.render("Header")}</th>
                        ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                        <tr onClick={() => getUserIdOnClick(row.original.uid)} className='cursor-pointer bg-white border-b dark:bg-gray-800 dark:border-gray-700' {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                            return <td className='px-6 py-4' {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                            })}
                        </tr>
                        );
                    })}
                </tbody>
            </table>            
        </div>
    </main>
    );


    
}
export default Dashboard;