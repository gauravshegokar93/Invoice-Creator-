import type { MetadataRoute } from 'next';
import { getInvoices } from '@/lib/actions';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = 'https://invoice-generator-free.in';

  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/invoice/new`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/invoices`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Dynamic invoice pages
  const invoices = await getInvoices();
  const invoiceRoutes = invoices.map((invoice) => ({
    url: `${siteUrl}/invoice/${invoice.id}`,
    lastModified: new Date(), // Ideally, you would use the invoice's last updated date
    changeFrequency: 'yearly' as 'yearly',
    priority: 0.5,
  }));

  return [...staticRoutes, ...invoiceRoutes];
}
