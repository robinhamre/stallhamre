import {StructureBuilder} from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Sport')
        .child(
          S.list()
            .title('Sport')
            .items([
              S.documentTypeListItem('horse').title('Hest'),
              S.documentTypeListItem('driver').title('Kusk'),
              S.documentTypeListItem('track').title('Travbane'),
              S.documentTypeListItem('result').title('Resultat'),
              S.documentTypeListItem('resultCategory').title('Resultat-kategorier'),
            ])
        ),

      S.listItem()
        .title('Innhold')
        .child(
          S.list()
            .title('Innhold')
            .items([
              S.documentTypeListItem('post').title('Innlegg'),
              S.documentTypeListItem('reportage').title('Reportasjer'),
              S.documentTypeListItem('reportageCategory').title('Reportasjekategorier'),
              S.documentTypeListItem('tips').title('Tips'),
              S.documentTypeListItem('tipsCategory').title('Tips-kategorier'),
              S.documentTypeListItem('category').title('Kategori'),
            ])
        ),

      S.listItem()
        .title('Stall / Andeler')
        .child(
          S.list()
            .title('Stall / Andeler')
            .items([
              S.documentTypeListItem('owner').title('Eier'),
              S.documentTypeListItem('shareOwner').title('Andelseier'),
              S.documentTypeListItem('shareOffer').title('Andelstilbud'),
              S.documentTypeListItem('shareManager').title('Andelsbestyrer'),
              S.documentTypeListItem('andelshest').title('Andelshester'),

              S.listItem()
                .title('Andelsfaktura (Kjøp)')
                .child(
                  S.document()
                    .schemaType('andelskjop')
                    .documentId('andelskjop-register')
                ),
            ])
        ),

      S.listItem()
        .title('Administrasjon')
        .child(
          S.list()
            .title('Administrasjon')
            .items([
              S.documentTypeListItem('staff').title('Personal'),
              S.documentTypeListItem('oppasser').title('Oppassere'),
              S.documentTypeListItem('supplier').title('Leverandør'),
              S.documentTypeListItem('invoice').title('Viderefakturering'),
              S.documentTypeListItem('kontraktmal').title('Kontraktsmaler'),

              S.listItem()
                .title('Mattilsynet')
                .child(
                  S.document()
                    .schemaType('mattilsynet')
                    .documentId('mattilsynet-register')
                ),

              S.listItem()
                .title('Proforma')
                .child(
                  S.document()
                    .schemaType('proforma')
                    .documentId('proforma-register')
                ),
            ])
        ),

      S.listItem()
        .title('Media')
        .child(
          S.list()
            .title('Media')
            .items([
              S.documentTypeListItem('imageLibrary').title('Bildebank'),
            ])
        ),

      S.listItem()
        .title('Historikk')
        .child(
          S.list()
            .title('Historikk')
            .items([
              S.documentTypeListItem('yearStatsHistoric').title('År-historisk'),
            ])
        ),
    ])