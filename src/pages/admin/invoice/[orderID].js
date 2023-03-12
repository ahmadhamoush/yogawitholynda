import { Invoice } from "@/components/Invoice"
import { findOrder } from "@/pages/api/order/[id]"
import { initMongoose } from "lib/mongoose"
import { useState } from "react"
import { renderToString } from 'react-dom/server'

 export default function DownloadInvoice({order}){
    const[downloading,setDownloading] = useState(false)
    
    async function convertInvoice(){
        setDownloading(true)
        const element =  document.querySelector('.page')
      
        import('html2canvas').then(html2canvas => {
          html2canvas.default(element).then(canvas => 
           {
            const imgData = canvas.toDataURL('image/png')
            import("jspdf").then(({ jsPDF }) => {
              const pdf = new jsPDF('p', 'mm', [297, 210]);
              var width = pdf.internal.pageSize.getWidth();
              var height = pdf.internal.pageSize.getHeight();
              pdf.addImage(imgData, 'JPEG', 0, 0, width, height)
              pdf.save(`${order.orderID}.pdf`)
               setDownloading(false)
           }
          )
        }).catch(e => {console("load failed")})})
       
    }


    
    return(
        <div className="invoiceDownloadContainer">
        <button className="invoiceBtn" onClick={convertInvoice}>{downloading ? 'Downloading...(it may take a few seconds)' : 'Download'}</button>
        {order?.orderID && (<div className="invoiceDownload" dangerouslySetInnerHTML={{__html: renderToString( <Invoice  order={order} />)}} />)}
         </div> )
   }
   
   export async function getServerSideProps(context){
    await initMongoose()
    return {
      props:{
       order: JSON.parse(JSON.stringify(await findOrder(context.query.orderID))),
      }
    }
  }