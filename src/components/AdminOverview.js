import Loader from "./Loader";

function AdminOverview({customers,orders}){

    const profit = () => {

        let total_profit = 0;
        for (let i = 0; i <orders.length; i++) {
            if(orders[i].paid){
                total_profit+=orders[i].total
            }
        }
        return total_profit
    }

    return(
        <div className="overview"> 
        {!customers.length>0 && !orders.length>0  && <Loader />}
         <h1>Overview</h1>
         <div className="overviewFlex">
         <div className="card">
             <h4>Total Customers</h4>
             <p>{customers.length}</p>
         </div>
         <div className="card">
             <h4>Total Orders</h4>
             <p>{orders.length}</p>
         </div>
         <div className="card">
             <h4>Revenue</h4>
           <p>${profit()}</p>
         </div>
         </div>
      </div>
    )
}
export default AdminOverview