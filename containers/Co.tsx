import { Grid, Typography, Container, Button, Link, Card } from '@mui/material'
import Logo from '../components/Logo'
import OrderedList from '../components/OrderedList'
import Image from '../components/Image'

const classes = [
  'Alchymista',
  'Kovář',
  'Kněz/správce chrámu',
  'Hlídka (3+)',
  'Představená Cechu švadlen a šiček',
  'Bard',
  'Mágové z lóže (3x)',
  'Farmář',
  'Felčar',
  'Lovec',
]

const Co = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h2" textAlign="center" color="primary" gutterBottom>
        C<Logo size="uppercase" />?
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <OrderedList>
            <li>
              Tradiční Larpový tábor pro účastníky ze všech koutků ČR. Tábor
              letos opět proběhne na Křekově u Valašských Klobouk. Bohužel
              nejsme schopni zajistit hromadnou dopravu na tábor, tak je potřeba
              se dopravit po vlastní ose. Dotazy k dopravě směřujte na{' '}
              <Link href="mailto:vydra@malenovska.cz">vydra@malenovska.cz</Link>{' '}
              <div>
                <Button
                  variant="text"
                  size="large"
                  href="https://www.facebook.com/SMRzakladna/"
                >
                  Facebookové stránky základny
                </Button>
                <Button
                  variant="text"
                  size="large"
                  href="https://mapy.cz/s/gudulevape"
                >
                  Mapy.cz
                </Button>
              </div>
            </li>
            <li>
              Letos budeme pokračovat v tradici a připravili jsme pokračování
              vícedenního LARPu, na který od Vás potřebujeme, abyste si
              připrvili vlastní postavy. S postavama Vám pomůže Vydra, můžete ho
              kontaktovat na FB, Discordu nebo na emailu{' '}
              <Link href="mailto:vydra@malenovska.cz">vydra@malenovska.cz</Link>
              . Abyste vědeli, co Vás čeká, zde je počáteční info, kde se bude
              LARP odehrávat
            </li>
            <li>
              Protože bude tábor zaměřený především na hraní LARPu, je třeba s
              sebou mít kostým, který odpovídá vaší postavě. Také vás poprosíme
              aby jste si pro letošní rok zajistili vlastní zbraně.
            </li>
            <li>
              Co s sebou?
              <br />
              Kostým na Vaši postavu
              <br />
              Spacák
              <br />
              Karimatku
              <br />
              Baterku nebo jinou svítilnu (doporučujeme čelovku)
              <br />
            </li>
            <li>Termín: 13.8.2023 - 20.8.2023</li>
            <li>Cena: 4300 Kč</li>
          </OrderedList>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Image src="/smr_zakladna.jpg" />
        </Grid>
      </Grid>
      <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
        Letošní tábor se bude konat v trochu jiném středisku než jste zvyklí (ti
        co nebyli loni). Základna se nachází u lesa u obce Křekov, v malebné
        přírodě v srdci Valašska. Na základně je tekoucí pitná voda, sprcha,
        splachovací WC. Ubytování je ve stanech s podsadou a postelemi, nicméně
        je nutné si vzít dobrý spacák, na konci srpna už může být v noci zima.
        Doporučujeme si taky vzít karimatku pro případné spaní venku. Na
        základně je elektřina pouze v organizátorské chatě, ke které účastníci
        mají přístup výjimečně. Samozřejmě bude možnost nabít telefony na konci
        tábora, abyste se mohli domluvit na odjezdu, ale z naší zkušenosti
        telefony na táboře jsou spíše na škodu. V průběhu tábora bude možné
        kontaktovat organizátory, stejně tak účastníci budou mít možnost
        kontaktovat své rodiče přes organizátory. Ale není poetičtější napsat
        dopis?
      </Typography>
      <Typography variant="body1">
        Děj našeho larpu se odehrává v malém, ale zdaleka ne bezvýznamném
        městečku Mrsklesy. Nachází se na obchodní stezce, takže přitahuje
        spoustu bohatých, ale i divných lidí (a jiných bytostí). Letos jsme si
        pro vás připravili role ve městě, které budou vaše postavy vykonávat,
        ale samozřejmě můžete mít spousty dalších cílů. Tyto role jsou:
      </Typography>
      <Grid
        sx={{ mt: 2 }}
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        {classes.map((c) => (
          <Grid item key={c}>
            <Card
              sx={{
                p: 3,
                m: 0,
                background: (t) => t.palette.primary.main,
                color: (t) => t.palette.primary.contrastText,
              }}
            >
              {c}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Co
