import React from 'react';

export default function ReceiptPrint({ orderData }) {
  // Sinov uchun sukut bo'yicha (default) ma'lumotlar
  const defaultOrder = {
    id: '2129',
    waiter: 'Dilshod',
    customer: 'Gʻozal',
    customerPhone: '+998 90 433 18 12',
    table: '1 (Osnovnoy zal)',
    bonuses: 31380,
    createdTime: '24 oktyabr 2026 15:52',
    items: [
      { name: 'Sendvich c krevetkami', qty: 1, price: 73000 },
      { name: 'Krevetka tempurniy 5sht', qty: 1, price: 72000 },
      { name: 'Zapechennyy roll Dabl Chikken', qty: 1, price: 77000 },
      { name: 'Roll Filadelfiya', qty: 1, price: 75000 },
      { name: 'Kola 1,5', qty: 1, price: 20000 },
    ],
  };

  // Agar prop orqali orderData kelmasa, defaultOrder ishlatiladi
  const data = orderData || defaultOrder;

  // Jami summani hisoblash
  const totalAmount = data.items.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Chop etish funksiyasi
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4 flex flex-col items-center bg-gray-100 min-h-screen">
      {/* 🖨️ CHOP ETILGANDA FAQT CHEK CHIQISHI UCHUN MAXSUS STIL */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #printable-receipt, #printable-receipt * {
            visibility: visible !important;
          }
          #printable-receipt {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 80mm !important;
            margin: 0 !important;
            padding: 4px !important;
            box-shadow: none !important;
            border: none !important;
          }
          @page {
            size: 80mm auto;
            margin: 0;
          }
        }
      `}</style>

      {/* CHEK BLOKI (80mm termoprinter uchun mo'ljallangan) */}
      <div
        id="printable-receipt"
        className="w-[80mm] p-4 bg-white border border-dashed border-gray-400 font-mono text-[12px] leading-tight text-black shadow-md rounded-sm"
      >
        {/* Sarlavha / Logo */}
        <div className="text-center mb-2">
          <h1 className="text-2xl font-black tracking-wider uppercase m-0">YAMATO</h1>
          <p className="text-[11px] text-gray-700 m-0">sushiyamato</p>
        </div>

        <div className="border-b border-dashed border-black my-2" />

        {/* Chek ma'lumotlari */}
        <div className="flex justify-between my-0.5"><span>Chek №:</span><span className="font-bold">{data.id}</span></div>
        <div className="flex justify-between my-0.5"><span>Ofitsiant:</span><span>{data.waiter}</span></div>
        <div className="flex justify-between my-0.5"><span>Ochilgan:</span><span>{data.createdTime}</span></div>
        <div className="flex justify-between my-0.5"><span>Chop etilgan:</span><span>{new Date().toLocaleString('ru-RU')}</span></div>
        <div className="flex justify-between my-0.5"><span>Stol №:</span><span>{data.table}</span></div>
        <div className="flex justify-between my-0.5"><span>Mijoz:</span><span>{data.customer}</span></div>
        {data.customerPhone && (
          <div className="flex justify-end my-0.5"><span>{data.customerPhone}</span></div>
        )}
        <div className="flex justify-between my-0.5"><span>Bonuslar:</span><span>{data.bonuses.toLocaleString()} soʻm</span></div>

        <div className="border-b border-dashed border-black my-2" />

        {/* Mahsulotlar jadvali */}
        <table className="w-full text-[11px] border-collapse">
          <thead>
            <tr className="border-b border-dashed border-black">
              <th className="text-left pb-1">Naimenovanie</th>
              <th className="text-center pb-1">Kol-vo</th>
              <th className="text-right pb-1">Cena</th>
              <th className="text-right pb-1">Itogo</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={index}>
                <td className="py-1 pr-1 max-w-[110px] break-words">{item.name}</td>
                <td className="text-center py-1 align-top">{item.qty}</td>
                <td className="text-right py-1 align-top">{item.price.toLocaleString()}</td>
                <td className="text-right py-1 align-top">{(item.price * item.qty).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="border-b border-dashed border-black my-2" />

        {/* Narx hisobi */}
        <div className="flex justify-between my-1">
          <span>Itogo</span>
          <span>{totalAmount.toLocaleString()} soʻm</span>
        </div>

        <div className="border-b border-dashed border-black my-2" />

        <div className="flex justify-between my-1 text-[14px] font-bold">
          <span>K oplate</span>
          <span>{totalAmount.toLocaleString()} soʻm</span>
        </div>

        <div className="border-b border-dashed border-black my-2" />

        {/* Pastki qism */}
        <div className="text-center mt-3 text-[10px]">
          <p className="m-0 font-bold">SUSHI_YAMATO_ | +998876450505</p>
          <p className="m-1 italic">Vas jdet priyatnyy syurpriz</p>
        </div>
      </div>

      {/* CHOP ETISH TUGMASI (Chop etilganda ko'rinmaydi) */}
      <button
        onClick={handlePrint}
        className="mt-6 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-lg transition-all active:scale-95 print:hidden cursor-pointer"
      >
        🖨️ Chekni chiqarish (Test)
      </button>
    </div>
  );
}