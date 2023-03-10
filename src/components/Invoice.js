export function Invoice({order}){ 
    return(
        <div className="page">
        <div className="subpage">
          <div className="invoiceHeader">
          <h1>INVOICE</h1>
            <div>
            <h4>YOGAWITHOLYNDA</h4>
          <p>Beirut, Lebanon</p>
            </div>
          </div>

       
            <div className="invoiceDetails">
          <div>
            <h4>BILL TO</h4>
            <p>{order.user.fName + ' ' + order.user.lName}</p>
            <p>{order.user.address.secondary}</p>
            <p>{order.user.address.city + ', ' + order.user.address.main}</p>
          </div>
          <div>
            <div>
                <h4>INVOICE #</h4>
                <p>{order.orderID}</p>
            </div>
            <div>
                <h4>INVOICE DATE</h4>
                <p>{order.createdAt.split('T')[0]}</p>
            </div>
          </div>
          </div>
     
        <div className="invoiceTable">
      
            <table>
                <thead>    
                    <tr>
                        <th>QTY</th>
                        <th>ITEM</th>
                        <th>PRICE</th>
                        <th>AMOUNT</th>
                    </tr>          
         
                </thead>
                <tbody>
                    {order.products.map(product=>{
                        return(
                            <tr key={product.name}>
                            <td>{product.quantity}</td>
                            <td className="invoiceProductName">{product.name}</td>
                            <td>${product.price}</td>
                            <td>${product.price * product.quantity}</td>
                        </tr>
                        )
                    })}
                </tbody>
                <tfoot className="footer">
                <tr >
                        <td></td>
                        <td></td>
                        <td>Subtotal</td>
                        <td>${order.subtotal}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td>Delivery</td>
                        <td>${order.total -order.subtotal}</td>
                    </tr>
                    <tr className="invoiceTotal">
                        <td></td>
                        <td></td>
                        <td>Total</td>
                        <td>${order.total}</td>
                    </tr>
                </tfoot>
            </table>
        </div>

        </div>
    </div>
       
    )
}


