const stats = [
  { value: '40+', label: 'Clients Served', sublabel: 'USA & EU' },
  { value: '120+', label: 'Dashboards Delivered', sublabel: 'Across 12 industries' },
  { value: '10hrs', label: 'Saved Per Week', sublabel: 'Average per client' },
  { value: '4.9★', label: 'Client Rating', sublabel: 'From 38 reviews' },
];

export default function StatsSection() {
  return (
    <section className="bg-primary-600 text-white py-12">
      <div className="container-xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-extrabold text-white mb-1">{stat.value}</p>
              <p className="font-semibold text-primary-100">{stat.label}</p>
              <p className="text-sm text-primary-200">{stat.sublabel}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
