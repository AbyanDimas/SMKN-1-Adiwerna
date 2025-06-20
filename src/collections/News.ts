import type { CollectionConfig } from 'payload/types';

const Berita: CollectionConfig = {
  slug: 'berita',
  labels: {
    singular: 'Artikel Berita',
    plural: 'Berita',
  },
  admin: {
    useAsTitle: 'judul',
    defaultColumns: ['judul', 'kategori', 'tanggalPublikasi', 'status', 'fitur'],
    group: 'Konten',
    preview: (doc: { slug: string }) => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/berita/${doc.slug}?preview=true`
    },
  },
  versions: {
    drafts: {
      autosave: true,
    },
    maxPerDoc: 10,
  },
  access: {
    read: ({ req }: { req: { user: unknown } }) => {
      if (req.user) return true;
      return {
        and: [
          { status: { equals: 'published' } },
          { tanggalPublikasi: { less_than_equal: new Date().toISOString() } },
        ],
      };
    },
  },
  fields: [
    // Informasi Dasar
    {
      name: 'judul',
      type: 'text',
      required: true,
      localized: true,
      maxLength: 120,
      admin: {
        description: 'Judul berita (maksimal 120 karakter)',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Identifikasi untuk URL',
      },
      hooks: {
        beforeValidate: [
          ({ value }: { value: unknown }) => {
            if (typeof value === 'string') {
              return value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            }
            return value;
          },
        ],
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draf', value: 'draft' },
        { label: 'Publikasikan', value: 'published' },
        { label: 'Arsipkan', value: 'archived' },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
    },

    // Konten
    {
      name: 'konten',
      type: 'richText',
      required: true,
      localized: true,
      admin: {
        elements: [
          'h2',
          'h3',
          'h4',
          'blockquote',
          'link',
          'ol',
          'ul',
          'indent',
        ],
        leaves: ['bold', 'italic', 'underline', 'strikethrough'],
        upload: {
          collections: {
            media: {
              fields: [
                {
                  name: 'caption',
                  type: 'text',
                  label: 'Keterangan',
                },
                {
                  name: 'alignment',
                  type: 'select',
                  options: ['kiri', 'tengah', 'kanan'],
                  label: 'Penjajaran',
                },
              ],
            },
          },
        },
      },
    },
    {
      name: 'ringkasan',
      type: 'textarea',
      localized: true,
      maxLength: 200,
      admin: {
        description: 'Ringkasan singkat untuk pratinjau (maksimal 200 karakter)',
      },
    },

    // Visual
    {
      name: 'gambarUtama',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Gambar utama yang ditampilkan dengan artikel berita',
      },
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
    {
      name: 'galeriGambar',
      type: 'array',
      label: 'Gambar Tambahan',
      fields: [
        {
          name: 'gambar',
          type: 'upload',
          relationTo: 'media',
          required: true,
          filterOptions: {
            mimeType: { contains: 'image' },
          },
        },
        {
          name: 'keterangan',
          type: 'text',
          localized: true,
        },
      ],
    },

    // Metadata
    {
      name: 'tanggalPublikasi',
      type: 'date',
      defaultValue: () => new Date(),
      required: true,
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'd MMM yyy HH:mm',
        },
      },
    },
    {
      name: 'kategori',
      type: 'select',
      options: [
        { label: 'Akademik', value: 'academic' },
        { label: 'Acara', value: 'event' },
        { label: 'Prestasi', value: 'achievement' },
        { label: 'Pengumuman', value: 'announcement' },
        { label: 'Umum', value: 'general' },
      ],
      defaultValue: 'general',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tag',
      type: 'array',
      label: 'Tag',
      fields: [
        {
          name: 'namaTag',
          type: 'text',
        },
      ],
    },
    {
      name: 'fitur',
      type: 'checkbox',
      label: 'Berita Unggulan',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Tampilkan berita ini di bagian unggulan',
      },
    },

    // Konten Terkait
    {
      name: 'beritaTerkait',
      type: 'relationship',
      relationTo: 'berita',
      hasMany: true,
      filterOptions: ({ id }: { id: string }) => {
        return { id: { not_equals: id } };
      },
    },
    {
      name: 'acaraTerkait',
      type: 'relationship',
      relationTo: 'events', // Tetap menggunakan 'events' sebagai slug collection acara
      hasMany: true,
    },

    // SEO
    {
      name: 'seo',
      type: 'group',
      label: 'Pengaturan SEO',
      fields: [
        {
          name: 'judulMeta',
          type: 'text',
          localized: true,
          admin: {
            description: 'Judul untuk mesin pencari (50-60 karakter)',
          },
        },
        {
          name: 'deskripsiMeta',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'Deskripsi untuk mesin pencari (150-160 karakter)',
          },
        },
        {
          name: 'kataKunci',
          type: 'text',
          localized: true,
        },
      ],
    },

    // Informasi Penulis
    {
      name: 'penulis',
      type: 'relationship',
      relationTo: 'users', // Tetap menggunakan 'users' sebagai slug collection pengguna
      defaultValue: ({ user }: { user?: { id: string } }) => user?.id,
      admin: {
        position: 'sidebar',
        allowCreate: false,
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, operation }: { 
        data: any, 
        req: { user?: { id: string } }, 
        operation: string 
      }) => {
        if (operation === 'create' && data.status === 'published' && req.user) {
          data.dipublikasikanOleh = req.user.id;
          data.dipublikasikanPada = new Date();
        }
        return data;
      },
    ],
  },
  endpoints: [
    {
      path: '/slug/:slug',
      method: 'get',
      handler: async (req: any, res: any) => {
        const berita = await req.payload.find({
          collection: 'berita',
          where: {
            slug: {
              equals: req.params.slug,
            },
          },
          limit: 1,
        });
        if (berita.docs.length > 0) {
          res.status(200).send(berita.docs[0]);
        } else {
          res.status(404).send({ error: 'Tidak Ditemukan' });
        }
      },
    },
  ],
};

export default Berita;