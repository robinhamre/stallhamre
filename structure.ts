import {StructureBuilder} from 'sanity/structure'

const CURRENT_YEAR = new Date().getFullYear()

const MONTHS = [
  {title: 'Januar', value: '01'},
  {title: 'Februar', value: '02'},
  {title: 'Mars', value: '03'},
  {title: 'April', value: '04'},
  {title: 'Mai', value: '05'},
  {title: 'Juni', value: '06'},
  {title: 'Juli', value: '07'},
  {title: 'August', value: '08'},
  {title: 'September', value: '09'},
  {title: 'Oktober', value: '10'},
  {title: 'November', value: '11'},
  {title: 'Desember', value: '12'},
] as const

const payrollMonthItems = (S: StructureBuilder, year: number) =>
  MONTHS.map((month) =>
    S.listItem()
      .title(month.title)
      .child(
        S.documentTypeList('lonnsliste')
          .title(`${month.title} ${year}`)
          .filter('_type == "lonnsliste" && year == $year && month == $month')
          .params({year, month: month.value})
          .defaultOrdering([
            {field: 'employee.name', direction: 'asc'},
            {field: 'year', direction: 'desc'},
            {field: 'month', direction: 'desc'},
          ])
      )
  )

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

              S.listItem()
                .title('Lønnslister')
                .child(
                  S.list()
                    .title('Lønnslister')
                    .items([
                      S.listItem()
                        .title(`Alle lønnslister (${CURRENT_YEAR})`)
                        .child(
                          S.documentTypeList('lonnsliste')
                            .title(`Alle lønnslister (${CURRENT_YEAR})`)
                            .filter('_type == "lonnsliste" && year == $year')
                            .params({year: CURRENT_YEAR})
                            .defaultOrdering([
                              {field: 'month', direction: 'desc'},
                              {field: 'employee.name', direction: 'asc'},
                            ])
                        ),

                      S.listItem()
                        .title(`${CURRENT_YEAR} per måned`)
                        .child(
                          S.list()
                            .title(`${CURRENT_YEAR} per måned`)
                            .items(payrollMonthItems(S, CURRENT_YEAR))
                        ),

                      S.documentTypeListItem('lonnsliste').title('Alle år'),
                    ])
                ),

              S.documentTypeListItem('oppasser').title('Oppassere'),
              S.documentTypeListItem('supplier').title('Leverandør'),
              S.documentTypeListItem('invoice').title('Viderefakturering'),
              S.documentTypeListItem('kontraktmal').title('Kontraktsmaler'),
              S.documentTypeListItem('fillager').title('Fillager'),

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