import { CollectionConfig } from 'payload';

const Departments: CollectionConfig = {
  slug: 'departments',
  admin: {
    useAsTitle: 'nama',
    defaultColumns: ['nama', 'kepalaDepartemen', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    // Informasi Dasar
    {
      name: 'nama',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Identifikasi URL-friendly untuk departemen',
      },
    },
    {
      name: 'deskripsi',
      type: 'textarea',
      localized: true,
    },
    
    // Elemen Visual
    {
      name: 'gambarUtama',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Gambar utama yang merepresentasikan departemen',
      },
    },
    {
      name: 'galeriFoto',
      type: 'array',
      label: 'Galeri Foto',
      fields: [
        {
          name: 'gambar',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'keterangan',
          type: 'text',
          localized: true,
        }
      ],
    },
    
    // Kepemimpinan Departemen
    {
      name: 'kepalaDepartemen',
      type: 'group',
      label: 'Kepala Departemen',
      fields: [
        {
          name: 'nama',
          type: 'text',
          required: true,
        },
        {
          name: 'jabatan',
          type: 'text',
          required: true,
        },
        {
          name: 'biografi',
          type: 'textarea',
        },
        {
          name: 'foto',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'email',
          type: 'text',
        },
      ],
    },
    
    // Program Akademik
    {
      name: 'programAkademik',
      type: 'array',
      label: 'Program Akademik',
      fields: [
        {
          name: 'namaProgram',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'deskripsiProgram',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'gambarProgram',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    
    // Mitra Industri
    {
      name: 'mitraIndustri',
      type: 'array',
      label: 'Mitra Industri',
      fields: [
        {
          name: 'namaMitra',
          type: 'text',
          required: true,
        },
        {
          name: 'logoMitra',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'websiteMitra',
          type: 'text',
          label: 'URL Website',
        },
        {
          name: 'detailKolaborasi',
          type: 'textarea',
          label: 'Detail Kolaborasi',
          localized: true,
        },
      ],
    },
    
    // Field SEO
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
          admin: {
            description: 'Kata kunci dipisahkan koma untuk SEO',
          },
        },
        {
          name: 'gambarOg',
          type: 'upload',
          relationTo: 'media',
          label: 'Gambar untuk Media Sosial',
        },
      ],
    },
    
    // Informasi Tambahan
    {
      name: 'informasiKontak',
      type: 'group',
      label: 'Informasi Kontak',
      fields: [
        {
          name: 'email',
          type: 'text',
        },
        {
          name: 'telepon',
          type: 'text',
        },
        {
          name: 'lokasi',
          type: 'text',
        },
      ],
    },
  ],
};

export default Departments;