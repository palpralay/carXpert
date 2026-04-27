const CustomerDashboard = () => {
  return (
    <section className="mx-auto mt-28 w-[min(94%,1000px)] pb-12">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60 md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
          Customer Dashboard
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
          Welcome to your service center
        </h1>
        <p className="mt-4 max-w-2xl text-slate-600">
          Track your service requests, manage bookings, and chat with verified
          mechanics from one place.
        </p>
      </div>
    </section>
  );
};

export default CustomerDashboard;
