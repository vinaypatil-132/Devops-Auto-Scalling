import { query } from '@/lib/db';
import Link from 'next/link';
import { CheckCircle2, PackageCheck, Truck, ArrowRight, Calendar, MapPin, Mail, User } from 'lucide-react';

export const revalidate = 0;

interface OrderSuccessPageProps {
  searchParams: {
    orderId?: string;
  };
}

interface OrderRecord {
  id: string;
  customer_name: string;
  customer_email: string;
  shipping_address: string;
  city: string;
  postal_code: string;
  payment_method: string;
  total_amount: number | string;
  status: string;
  created_at: string;
}

interface OrderItemRecord {
  id: number;
  product_name: string;
  quantity: number;
  price: number | string;
}

async function getOrderDetails(orderId: string) {
  try {
    const orderRes = await query('SELECT * FROM orders WHERE id = $1', [orderId]);
    if (orderRes.rows.length === 0) return null;

    const itemsRes = await query('SELECT * FROM order_items WHERE order_id = $1', [orderId]);
    return {
      order: orderRes.rows[0] as OrderRecord,
      items: itemsRes.rows as OrderItemRecord[],
    };
  } catch (error) {
    console.error(`Error fetching order ${orderId}:`, error);
    return null;
  }
}

export default async function OrderSuccessPage({ searchParams }: OrderSuccessPageProps) {
  const orderId = searchParams.orderId;

  if (!orderId) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-900">No order specified</h1>
        <Link href="/products" className="inline-block px-6 py-3 bg-brand-600 text-white font-bold text-xs rounded-xl">
          Return to Shop
        </Link>
      </div>
    );
  }

  const details = await getOrderDetails(orderId);

  if (!details) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-900">Order Not Found</h1>
        <p className="text-slate-500 text-sm">We could not find order ID {orderId} in the database.</p>
        <Link href="/products" className="inline-block px-6 py-3 bg-brand-600 text-white font-bold text-xs rounded-xl">
          Return to Shop
        </Link>
      </div>
    );
  }

  const { order, items } = details;
  const totalNum = typeof order.total_amount === 'string' ? parseFloat(order.total_amount) : order.total_amount;
  const orderDate = new Date(order.created_at || Date.now()).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Confirmation Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-4 shadow-sm">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-1">
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Order Confirmed & Stored in PostgreSQL
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight pt-2">
            Thank you for your order!
          </h1>
          <p className="text-slate-500 text-sm">
            Order Reference: <strong className="text-slate-900 font-mono">{order.id}</strong>
          </p>
        </div>
      </div>

      {/* Order Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shipping & Delivery Info */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Truck className="w-5 h-5 text-brand-600" /> Delivery Information
          </h2>

          <div className="space-y-3 text-xs text-slate-600">
            <div className="flex items-start gap-2.5">
              <User className="w-4 h-4 text-slate-400 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-800">Customer:</span> {order.customer_name}
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-slate-400 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-800">Email:</span> {order.customer_email}
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-800">Address:</span> {order.shipping_address}, {order.city} ({order.postal_code})
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-slate-400 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-800">Order Date:</span> {orderDate}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-brand-600" /> Payment & Status
          </h2>

          <div className="space-y-3 text-xs text-slate-600">
            <div className="flex justify-between items-center">
              <span>Status:</span>
              <span className="bg-blue-50 text-blue-700 font-bold px-2.5 py-1 rounded-md text-[11px] uppercase">
                {order.status}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span>Payment Mode:</span>
              <span className="font-semibold text-slate-800">{order.payment_method}</span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-sm">
              <span className="font-bold text-slate-900">Total Charged:</span>
              <span className="font-black text-brand-600 text-lg">${totalNum.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Itemized Order Receipt */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          Ordered Line Items
        </h2>

        <div className="divide-y divide-slate-100">
          {items.map((item) => {
            const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
            return (
              <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900">{item.product_name}</span>
                  <span className="text-slate-500 block">Quantity: {item.quantity} × ${price.toFixed(2)}</span>
                </div>
                <span className="font-extrabold text-slate-900">
                  ${(price * item.quantity).toFixed(2)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center pt-4">
        <Link
          href="/products"
          className="px-8 py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-brand-600/20 flex items-center gap-2"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
