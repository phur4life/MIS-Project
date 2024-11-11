// "use client";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import * as React from "react";
// import {
// 	ColumnDef,
// 	flexRender,
// 	SortingState,
// 	getCoreRowModel,
// 	getPaginationRowModel,
// 	getSortedRowModel,
// 	useReactTable,
// 	ColumnFiltersState,
// 	getFilteredRowModel,
// } from "@tanstack/react-table";

// import {
// 	Table,
// 	TableBody,
// 	TableCell,
// 	TableHead,
// 	TableHeader,
// 	TableRow,
// } from "@/components/ui/table";
// import AddMemberModal from "./memberDialog";

// interface DataTableProps<TData, TValue> {
// 	columns: ColumnDef<TData, TValue>[];
// 	data: TData[];
// 	onRemoveMember?: (id: string) => void;
// 	onStatusChange?: (
// 		row: TData,
// 		status: "Joined" | "Pending" | "Remove"
// 	) => void;
// 	onAddMember: (addMember: any) => void;
// }

// interface GlobalFilter {
// 	globalFilter: any;
// }
// export function DataTable<TData, TValue>({
// 	columns,
// 	data,
// 	onRemoveMember,
// 	onStatusChange,
// 	onAddMember,
// }: DataTableProps<TData, TValue>) {
// 	const [sorting, setSorting] = React.useState<SortingState>([]);
// 	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
// 		[]
// 	);
// 	const [globalFilter, setGlobalFilter] = React.useState<any>([]);
// 	const [isModalOpen, setIsModalOpen] = React.useState(false);
// 	const table = useReactTable({
// 		data,
// 		columns,
// 		getCoreRowModel: getCoreRowModel(),
// 		getPaginationRowModel: getPaginationRowModel(),
// 		onSortingChange: setSorting,
// 		getSortedRowModel: getSortedRowModel(),
// 		onColumnFiltersChange: setColumnFilters,
// 		getFilteredRowModel: getFilteredRowModel(),
// 		globalFilterFn: "includesString",
// 		state: {
// 			sorting,
// 			columnFilters,
// 			globalFilter,
// 		},
// 		onGlobalFilterChange: setGlobalFilter,
// 		meta: { onRemoveMember, onStatusChange },
// 	});

// 	return (
// 		<div>
// 			<div className="flex justify-between items-center">
// 				<div className="flex items-center py-4">
// 					<Input
// 						placeholder="Search..."
// 						value={globalFilter}
// 						onChange={(event) =>
// 							table.setGlobalFilter(String(event.target.value))
// 						}
// 						className="max-w-sm"
// 					/>
// 				</div>

// 				<Button
// 					variant="outline" // Adjust variant as needed
// 					className="ml-4" // Margin left for spacing
// 					onClick={() => setIsModalOpen(true)}
// 				>
// 					Add New Member
// 				</Button>
// 			</div>
// 			<div className="rounded-md border">
// 				<Table>
// 					<TableHeader>
// 						{table.getHeaderGroups().map((headerGroup) => (
// 							<TableRow key={headerGroup.id}>
// 								{headerGroup.headers.map((header) => {
// 									return (
// 										<TableHead key={header.id}>
// 											{header.isPlaceholder
// 												? null
// 												: flexRender(
// 														header.column.columnDef.header,
// 														header.getContext()
// 												  )}
// 										</TableHead>
// 									);
// 								})}
// 							</TableRow>
// 						))}
// 					</TableHeader>
// 					<TableBody>
// 						{table.getRowModel().rows?.length ? (
// 							table.getRowModel().rows.map((row) => (
// 								<TableRow
// 									key={row.id}
// 									data-state={row.getIsSelected() && "selected"}
// 								>
// 									{row.getVisibleCells().map((cell) => (
// 										<TableCell key={cell.id}>
// 											{flexRender(
// 												cell.column.columnDef.cell,
// 												cell.getContext()
// 											)}
// 										</TableCell>
// 									))}
// 								</TableRow>
// 							))
// 						) : (
// 							<TableRow>
// 								<TableCell
// 									colSpan={columns.length}
// 									className="h-24 text-center"
// 								>
// 									No results.
// 								</TableCell>
// 							</TableRow>
// 						)}
// 					</TableBody>
// 				</Table>
// 			</div>{" "}
// 			<div className="flex items-center justify-end space-x-2 py-4">
// 				<Button
// 					variant="outline"
// 					size="sm"
// 					onClick={() => table.previousPage()}
// 					disabled={!table.getCanPreviousPage()}
// 				>
// 					Previous
// 				</Button>
// 				<Button
// 					variant="outline"
// 					size="sm"
// 					onClick={() => table.nextPage()}
// 					disabled={!table.getCanNextPage()}
// 				>
// 					Next
// 				</Button>
// 			</div>
// 			<AddMemberModal
// 				isOpen={isModalOpen}
// 				onClose={() => setIsModalOpen(false)}
// 				onAddMember={onAddMember}
// 			/>
// 		</div>
// 	);
// }


// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import * as React from "react";
// import {
//   ColumnDef,
//   flexRender,
//   SortingState,
//   getCoreRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
//   ColumnFiltersState,
//   getFilteredRowModel,
// } from "@tanstack/react-table";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import AddMemberModal from "./memberDialog";

// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[];
//   onRemoveMember?: (id: string) => void;
//   onStatusChange?: (
//     row: TData,
//     status: "Joined" | "Pending" | "Remove"
//   ) => void;
//   onAddMember: (addMember: any) => void;
// }

// export function DataTable<TData, TValue>({
//   columns,
//   data,
//   onRemoveMember,
//   onStatusChange,
//   onAddMember,
// }: DataTableProps<TData, TValue>) {
//   const [sorting, setSorting] = React.useState<SortingState>([]);
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
//     []
//   );
//   const [globalFilter, setGlobalFilter] = React.useState<string>("");
//   const [isModalOpen, setIsModalOpen] = React.useState(false);

//   // Initialize the table instance with sorting, filtering, and pagination
//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     onSortingChange: setSorting,
//     getSortedRowModel: getSortedRowModel(),
//     onColumnFiltersChange: setColumnFilters,
//     getFilteredRowModel: getFilteredRowModel(),
//     globalFilterFn: "includesString",
//     state: {
//       sorting,
//       columnFilters,
//       globalFilter,
//     },
//     onGlobalFilterChange: setGlobalFilter,
//     meta: { onRemoveMember, onStatusChange },
//   });

//   // Filter data based on global filter
//   const filteredData = React.useMemo(() => {
//     if (globalFilter) {
//       return data.filter(
//         (user: any) =>
//           user.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
//           user.email.toLowerCase().includes(globalFilter.toLowerCase()) ||
//           user.status.toLowerCase().includes(globalFilter.toLowerCase())
//       );
//     }
//     return data;
//   }, [data, globalFilter]);

//   return (
//     <div>
//       {/* Search Bar and Add Member Button */}
//       <div className="flex justify-between items-center">
//         <div className="flex items-center py-4">
//           <Input
//             placeholder="Search..."
//             value={globalFilter}
//             onChange={(event) => setGlobalFilter(event.target.value)}
//             className="max-w-sm"
//           />
//         </div>
//         <Button
//           variant="outline" // Adjust variant as needed
//           className="ml-4" // Margin left for spacing
//           onClick={() => setIsModalOpen(true)}
//         >
//           Add New Member
//         </Button>
//       </div>

//       {/* Table Display */}
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <TableHead key={header.id}>
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(
//                             header.column.columnDef.header,
//                             header.getContext()
//                           )}
//                     </TableHead>
//                   );
//                 })}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {filteredData.length > 0 ? (
//               filteredData.map((row, rowIndex) => (
//                 <TableRow key={rowIndex}>
//                   {columns.map((column) => (
//                     <TableCell key={column.id}>
//                       {flexRender(column.cell, row[column.id as keyof TData])}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-24 text-center"
//                 >
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       {/* Pagination */}
//       <div className="flex items-center justify-end space-x-2 py-4">
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => table.previousPage()}
//           disabled={!table.getCanPreviousPage()}
//         >
//           Previous
//         </Button>
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => table.nextPage()}
//           disabled={!table.getCanNextPage()}
//         >
//           Next
//         </Button>
//       </div>

//       {/* Add Member Modal */}
//       <AddMemberModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onAddMember={onAddMember}
//       />
//     </div>
//   );
// }
