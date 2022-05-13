import { Grid, Typography, Container } from '@mui/material'
import Logo from '../components/Logo'
import Avatar from '../components/Avatar'

const people = [
  {
    avatar: '/vydra.jpg',
    nick: 'Vydra',
    name: 'Martin Andrýsek',
    role: 'Hlavní vedoucí',
    desc: 'Já jsem Vydra, nikdo mi jinak neřekne. Táborům, dřevárnám a LARPům se věnuji už přes 10 let, tábory jsem od mala miloval a vždycky jsem tíhl k fantasy literatuře. Takže když jsem objevil LARPy, tak se mi spojily moje 2 koníčky do jednoho. Jinak se rád potuluji po lese a trávím čas s kamarády, idealně na nějaké akci u uhně s kytarou',
  },
  {
    avatar: '/skali.jpg',
    nick: 'Skali',
    name: 'Petr Skalka',
    role: 'Vedoucí',
    desc: 'Já jsem Petr na kterého často táborníci volají přezdívkou "Skali", jsem zkušeným vedoucím se silným vztahem k fantasy. Už na základní a střední škole mě fascinovalo dračí doupě a podobné hry. Na první bitvě jsem běhal v prostěradlovém kostýmu a s mečem, jež jsem vyrobil z klacku, co jsem ukradl taťkovi ze zahrady od rajčat. Moje filosofie "na Larpy by se mělo jezdit pro radost, historickou přesnost a dokonalé kostýmy si nechte na rekonstrukce akcí".
Hraju na kytaru, rád vařím (a taky si to sním) a občas zajdu na procházku.',
  },
  {
    avatar: '/kuldas.jpg',
    nick: 'Kulďas',
    name: 'Michal Řezáč',
    role: 'Vedoucí',
    desc: 'Já jsem Michal a tábory jezdím tak dlouho, že si ještě pamatuju když byly elfové uznávaný národ. Občas mám pocit, že jsem se narodil s fantasy knížkou
    v ruce. K dřevárnám a larpům jsem se dostal začátkem střední
a nepustili mě dodnes. Rád se učím novým věcem a ještě
raději své zkušenosti předávám ostatním. Protože když
už člověk něco dělá, tak by to měl dělat pořádně.
Také se věnuji historickému šermu, abych pořád nedostával
na bitvách takovou bídu, sem tam něco brnknu na kytaru
a rád si poslechnu talentované muzikanty.
',
  },
]

const Kdo = () => (
  <>
    <Container maxWidth="lg">
      <Typography variant="h2" textAlign="center" color="primary" gutterBottom>
        Kd
        <Logo size="uppercase" />?
      </Typography>
      <Typography variant="body1" gutterBottom>
        Náš tým zkušených instruktorů a dlouholetých hráčů a pořadatelů LARPových akcí pořádá už 6. rokem LARP tábor, který má za cíl vychovat novou generaci LARPařů
        dřevárníků nebo obecně fantasy nadšenců jako jsme my. Postupným vývojem jsme vytvořili něco s přesahem, ůčastníci se nám vrací a každý rok jich přibývá, 
        proto se cítíme zavázání dělat tábor každý rok lepší a lepší.
      </Typography>
      <Grid
        sx={{ mt: 3 }}
        container
        alignItems="stretch"
        justifyContent="center"
        spacing={2}
      >
        {people.map((p) => (
          <Grid key={p.name} item xs={12} sm={6} lg={4}>
            <Avatar {...p} />
          </Grid>
        ))}
      </Grid>
    </Container>
  </>
)

export default Kdo
