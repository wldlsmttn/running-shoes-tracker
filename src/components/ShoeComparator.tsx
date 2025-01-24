import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Search, SortAsc, SortDesc } from 'lucide-react';

const Card = ({ className, children, ...props }: { className?: string, children: React.ReactNode }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className || ''}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ className, children, ...props }: { className?: string, children: React.ReactNode }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className || ''}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ className, children, ...props }: { className?: string, children: React.ReactNode }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className || ''}`} {...props}>
    {children}
  </h3>
);

const CardContent = ({ className, children, ...props }: { className?: string, children: React.ReactNode }) => (
  <div className={`p-6 pt-0 ${className || ''}`} {...props}>
    {children}
  </div>
);

interface StackHeight {
 heel: number;
 forefoot: number;
}

interface Shoe {
 id: number;
 name: string;
 brand: string;
 price: number;
 store: string;
 storeUrl: string;
 category: string;
 usage: string;
 drop: number;
 stackHeight: StackHeight;
 weight: number;
 toeBoxWidth: string;
 midsoleFoam: string;
 plate: string;
 estimatedDurability: number;
 terrain: string;
 supportType: string;
 lastUpdate: string;
}

interface SortConfig {
 key: keyof Shoe;
 direction: 'asc' | 'desc';
}

interface Filters {
 brand: string;
 category: string;
 usage: string;
 supportType: string;
}

interface Props {
 initialData: Shoe[];
 lastUpdate: string;
}

const RunningShoeComparator: React.FC<Props> = ({ initialData, lastUpdate }) => {
 const [shoes, setShoes] = useState<Shoe[]>(initialData);
 const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'price', direction: 'asc' });
 const [searchTerm, setSearchTerm] = useState('');
 const [filters, setFilters] = useState<Filters>({
   brand: 'all',
   category: 'all',
   usage: 'all',
   supportType: 'all',
 });

 const handleSort = (key: keyof Shoe) => {
   const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
   setSortConfig({ key, direction });
   
   const sortedShoes = _.orderBy(shoes, [key], [direction]);
   setShoes(sortedShoes);
 };

 const filterShoes = () => {
   let filtered = initialData;

   if (searchTerm) {
     filtered = filtered.filter(shoe => 
       shoe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       shoe.brand.toLowerCase().includes(searchTerm.toLowerCase())
     );
   }

   Object.entries(filters).forEach(([key, value]) => {
     if (value !== 'all') {
       filtered = filtered.filter(shoe => shoe[key as keyof Shoe] === value);
     }
   });

   setShoes(filtered);
 };

 useEffect(() => {
   filterShoes();
 }, [searchTerm, filters]);

 const brands = _.uniq(initialData.map(shoe => shoe.brand));
 const categories = _.uniq(initialData.map(shoe => shoe.category));
 const usages = _.uniq(initialData.map(shoe => shoe.usage));
 const supportTypes = _.uniq(initialData.map(shoe => shoe.supportType));

 const renderSortableHeader = (label: string, key: keyof Shoe) => (
   <th className="p-2 text-left cursor-pointer" onClick={() => handleSort(key)}>
     <div className="flex items-center gap-1">
       {label}
       {sortConfig.key === key && (
         sortConfig.direction === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
       )}
     </div>
   </th>
 );

 return (
   <Card className="w-full">
     <CardHeader>
       <CardTitle>Comparateur de Chaussures de Running</CardTitle>
       <div className="flex flex-wrap gap-4">
         <div className="relative">
           <Search className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
           <input
             type="text"
             placeholder="Rechercher..."
             className="pl-8 pr-4 py-2 border rounded-md"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
           />
         </div>
         
         <select
           className="p-2 border rounded-md"
           value={filters.brand}
           onChange={(e) => setFilters({...filters, brand: e.target.value})}
         >
           <option value="all">Toutes les marques</option>
           {brands.map(brand => (
             <option key={brand} value={brand}>{brand}</option>
           ))}
         </select>

         <select
           className="p-2 border rounded-md"
           value={filters.category}
           onChange={(e) => setFilters({...filters, category: e.target.value})}
         >
           <option value="all">Toutes les catégories</option>
           {categories.map(category => (
             <option key={category} value={category}>{category}</option>
           ))}
         </select>

         <select
           className="p-2 border rounded-md"
           value={filters.supportType}
           onChange={(e) => setFilters({...filters, supportType: e.target.value})}
         >
           <option value="all">Types de support</option>
           {supportTypes.map(type => (
             <option key={type} value={type}>{type}</option>
           ))}
         </select>
       </div>
     </CardHeader>

     <CardContent>
       <div className="overflow-x-auto">
         <table className="w-full">
           <thead>
             <tr className="border-b">
               {renderSortableHeader('Modèle', 'name')}
               {renderSortableHeader('Prix', 'price')}
               <th className="p-2 text-left">Magasin</th>
               <th className="p-2 text-left">Usage</th>
               {renderSortableHeader('Drop', 'drop')}
               <th className="p-2 text-left">Stack (H/A)</th>
               {renderSortableHeader('Poids', 'weight')}
               <th className="p-2 text-left">Toe-Box</th>
               <th className="p-2 text-left">Mousse</th>
               <th className="p-2 text-left">Plaque</th>
               {renderSortableHeader('Durabilité', 'estimatedDurability')}
               <th className="p-2 text-left">Support</th>
               <th className="p-2 text-left">Terrain</th>
             </tr>
           </thead>
           <tbody>
             {shoes.map((shoe) => (
               <tr key={shoe.id} className="border-b hover:bg-gray-50">
                 <td className="p-2">
                   <div className="font-medium">{shoe.name}</div>
                   <div className="text-sm text-gray-500">{shoe.brand}</div>
                 </td>
                 <td className="p-2">{shoe.price} €</td>
                 <td className="p-2">
                   <a href={shoe.storeUrl} target="_blank" rel="noopener noreferrer" 
                      className="text-blue-600 hover:underline">
                     {shoe.store}
                   </a>
                 </td>
                 <td className="p-2">{shoe.usage}</td>
                 <td className="p-2">{shoe.drop} mm</td>
                 <td className="p-2">{shoe.stackHeight.heel}/{shoe.stackHeight.forefoot}</td>
                 <td className="p-2">{shoe.weight} g</td>
                 <td className="p-2">{shoe.toeBoxWidth}</td>
                 <td className="p-2">{shoe.midsoleFoam}</td>
                 <td className="p-2">{shoe.plate}</td>
                 <td className="p-2">{shoe.estimatedDurability} km</td>
                 <td className="p-2">{shoe.supportType}</td>
                 <td className="p-2">{shoe.terrain}</td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
     </CardContent>
   </Card>
 );
};

export default RunningShoeComparator;
