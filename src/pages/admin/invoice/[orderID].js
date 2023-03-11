import { Invoice } from "@/components/Invoice"
import { findOrder } from "@/pages/api/order/[id]"
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { initMongoose } from "lib/mongoose"
import { useState } from "react"
import { renderToString } from 'react-dom/server'

 export default function DonwloadInvoice({order}){
    const[downloading,setDownloading] = useState(false)
    
    async function convertInvoice(){
        setDownloading(true)
        const element =  document.querySelector('.page')
        html2canvas(element, { onclone: (document) => {
            setDownloading(false)
          }})
          .then((canvas)=>{
            const imgData = canvas.toDataURL('image/png')
            const pdf = new jsPDF('p', 'mm', [297, 210]);
            var width = pdf.internal.pageSize.getWidth();
            var height = pdf.internal.pageSize.getHeight();
            pdf.addImage(imgData, 'JPEG', 0, 0, width, height)
            pdf.save(`${order.orderID}.pdf`)
          })
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