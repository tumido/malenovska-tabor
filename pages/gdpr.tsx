import type { NextPage } from 'next'
import Head from 'next/head'
import { Typography, CssBaseline, Container, Link } from '@mui/material'
import { styled, ThemeProvider } from '@mui/material/styles'
import { theme } from '../utils/theme'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Gdpr: NextPage = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Head>
      <title>GDPR - Larpový tábor</title>
      <meta name="description" content="Tábor v mezihoří" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header />
    <Container maxWidth="lg" sx={{ mt: '100px' }}>
      <Typography variant="h1">Zásady GDPR</Typography>
      <Typography variant="subtitle2" gutterBottom>
        Zásady nakládání s osobními údaji
      </Typography>
      <Typography variant="h4" component="h2" gutterBottom>
        Obecné
      </Typography>
      <Typography variant="body1">
        Správcem osobních údajů členů je spolek Strážci Mezihoří, IČO: ______,
        se sídlem ____, zapsaná ve spolkovém rejstříku vedeném u Městského soudu
        v Praze oddíl ____, vložka ____ (dále též jen „Strážci Mezihoří“). Vaše
        žádosti a dotazy týkající se zpracování osobních údajů přijmeme na
        adrese tabor@malenovska.cz nebo písemně na adrese našeho sídla. Přístup
        k osobním údajům účastníků tábora pořádaného Strážci Mezihoří má
        odpovědný vedoucí tábora a členové Senátu Stážců Mezihoří
      </Typography>
      <Typography variant="h4" component="h2" gutterBottom>
        Registrace a evidence účastníků
      </Typography>
      <Typography variant="body1">
        Za účelem evidence přihlášek na tábor podává účastník přihlášku na
        webových stránkách, čímž se stává účastníkem tábora. Účast na táboře s
        sebou nese nutnost zpracování a uchování uvedených osobních údajů
        přihlášené osoby: identifikátor účastníka, jméno, příjmení, datum
        narození, adresa trvalého bydliště, e-mailová adresa, telefonní kontakt
        a zdravotní pojišťovna u které je účastník vedený. Stejně tak je pro
        účely komunikace se zákonnými zástupci nezletilého účastníka nutné
        zpracovávat a uchovávat osobní údaje uvedené na přihlášce: jméno,
        příjmení, adresa trvalého bydliště pokud se liší od adresy účastníka,
        e-mailová adresa a telefonní kontakt.
      </Typography>
      <Typography variant="h4" component="h2" gutterBottom>
        Předávání údajů třetím stranám, příp. do zahraničí
      </Typography>
      <Typography variant="body1">
        Data sou uchovávány na serverech společnosti Google v Evropské unii v
        souladu s GDPR viz.{' '}
        <Link href="https://firebase.google.com/support/privacy">
          Privacy and Security in Firebase
        </Link>
        . Bez dalšího souhlasu nejsou údaje předávány žádné třetí osobě ani
        nikomu jinému.
      </Typography>
      <Typography variant="h4" component="h2" gutterBottom>
        Vaše obecná práva vztahující se ke zpracování osobních údajů
      </Typography>
      <Typography variant="body1">
        Máte právo přístupu k informacím, právo na opravu osobních údajů i další
        práva stanovená v § 21 GDPR, tj. zejm.:
        <ul>
          <li>právo na přístup k osobním údajům,</li>
          <li>právo na kopii zpracovávaných osobních údajů,</li>
          <li>
            právo na opravu nepřesných nebo na doplnění neúplných osobních údajů
            bez zbytečného odkladu,
          </li>
          <li>právo na výmaz osobních údajů bez zbytečného odkladu,</li>
          <li>právo na omezení zpracování osobních údajů,</li>
          <li>právo na přenositelnost údajů,</li>
          <li>
            právo podat stížnost ohledně činnosti Správce nebo příjemce osobních
            údajů.
          </li>
        </ul>
      </Typography>
    </Container>
    <Footer />
  </ThemeProvider>
)

export default Gdpr
