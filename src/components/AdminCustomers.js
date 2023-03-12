import { useState } from "react";

function AdminCustomers({ customers }) {
    const[search,setSearch] = useState('')
    return (
        <div className="tableContainer">    
        <div className="tableHeader">
        <h1>Customers ({customers.length})</h1>
        <input type='text' onChange={(e)=>setSearch(e.target.value)} value={search} className="search" placeholder="Search by Name"/>
     </div>
           <table>
          <thead>
          <tr>
             <th>
                 Fname
             </th>
             <th>
                 Lname
             </th>
             <th>
                 Email
             </th>
             <th>
                 Number
             </th>
             <th>
              Address1
             </th>
             <th>
              Address2
             </th>
             <th>
                 City
             </th>
            </tr>
          </thead>
          <tbody>
          {!customers.length>0 && <div className="notFound"><p>No customers</p></div>}
            {customers.filter(customer=>(customer.fName.toLowerCase() + ' ' + customer.lName.toLowerCase()).includes(search)).map(customer=>{
         return  <tr key={customer._id}>
             <td>{customer.fName}</td>
             <td>{customer.lName}</td>
             <td>{customer.email}</td>
             <td style={{color:  !customer?.number && 'rgb(255, 92, 100)' }}>{customer?.number ? customer.number : 'N/A'}</td>
             <td style={{color:  !customer?.address && 'rgb(255, 92, 100)' }}>{customer?.address ? customer.address.main: 'N/A'}</td>
             <td style={{color:  !customer?.address && 'rgb(255, 92, 100)' }}>{customer?.address ? customer.address.secondary : 'N/A'}</td>
             <td style={{color:  !customer?.address && 'rgb(255, 92, 100)' }}>{customer?.address ? customer.address.city : 'N/A'}</td>
         </tr>
         
              })}
              </tbody>
           </table>

         

     </div>
    )
}
export default AdminCustomers