import { Grid, Typography, Container } from '@mui/material'
import Logo from '../components/Logo'
import Avatar from '../components/Avatar'

const people = [
  {
    avatar: '/vydra.jpg',
    nick: 'Vydra',
    name: 'Martin Andrýsek',
    role: 'Hlavní vedoucí',
    desc: 'Já jsem Vydra, nikdo mi jinak neřekne. Táborům, dřevárnám a LARPům se věnuji už přes 10 let. Tábory jsem miloval od mala a vždycky jsem tíhl k fantasy literatuře, počítačovým a deskovým hrám na hrdiny. Takže když jsem objevil LARPy, tak jsem si mohl prožít všechny ty epické příběhy a bitvy na živo. Proto tento úžasný koníček chci předávat dalším lidem, aby si jako já našli svoje místo. Jinak se rád potuluji po lese a trávím čas s kamarády, idealně na nějaké akci u ohně s kytarou',
  },
  
  {
    avatar: '/kuldas.jpg',
    nick: 'Kulďas',
    name: 'Michal Řezáč',
    role: 'Vedoucí',
    desc: 'Já jsem Michal a tábory jezdím tak dlouho, že si ještě pamatuju když byly elfové uznávaný národ. Občas mám pocit, že jsem se narodil s fantasy knížkou v ruce. K dřevárnám a larpům jsem se dostal začátkem střední a nepustili mě dodnes. Rád se učím novým věcem a ještě raději své zkušenosti předávám ostatním. Protože když už člověk něco dělá, tak by to měl dělat pořádně. Také se věnuji historickému šermu, abych pořád nedostával na bitvách takovou bídu, sem tam něco brnknu na kytaru a rád si poslechnu talentované muzikanty.',
  },
  {
    avatar: '/lukas.jpg',
    nick: 'Krteček',
    name: 'Lukáš Čunek',
    role: 'Vedoucí',
    desc: 'Já jsem Luke, i když poslední dobou mi kamarádi začali říkat "Krtečku", tak slyším na oboje. K dřevárně jsem se dostal tak, že mě jednou spolužák pozval, ať s nima jdu do parku šermovat. A doistal jsem tam dvě věci. Za prvé takovou bídu, že mi natekl loket a já skoro nemohl hýbat rukou. A za druhé pozvání na Helmáč. A tam jsem se do celé té záležitosti kolem LARPú, bitev, zpívání u ohně a neuvěřitelných lidí ze skupiny zamiloval tak, že už si ani nedokážu představit, že bych se toho měl vzdát. A o něco později už přišlo jenom "Hej, pojeď s náma dělat tábor." A tak teď dělám tábor a doufám, že se nám podaří nadchnout mladé lidi tak, jak to před lety nadchlo mě.',
  },
  {
    avatar: '/dorian.jpg',
    nick: 'Dorian',
    name: 'Michal Roth',
    role: 'Vedoucí',
    desc: 'Mé jméno je Dorian, pro uspěchané Dory a pro policejní složky Michal, a LARPy a stolními RPG hrami trávím všechen svůj volný čas už skoro 16 let. Jsem celoživotní geek a nerd, barvoslepější než pes a alergický na tolik věcí, že jsem v podstatě chodící biohazard. Najdete mě nejčastěji nad složitými rovnicemi kvantové mechaniky, zamotaného v lese nebo u těch nejobskurnějších deskovek, čím složitější, tím lepší. Když zrovna nevyprávím různé hry na hrdiny, nevyvolávám Satana v servrovnách nebo nezapaluju své vlasy při ohňových show, věnuju se studiu IT a částicové fyziky nebo hraju na kytaru a čtu knížky.',
  },
  {
    avatar: '/skali.jpg',
    nick: 'Skali',
    name: 'Petr Skalka',
    role: 'Vedoucí',
    desc: 'Já jsem Petr na kterého často táborníci volají přezdívkou "Skali", jsem zkušeným vedoucím se silným vztahem k fantasy. Už na základní a střední škole mě fascinovalo dračí doupě a podobné hry. Na první bitvě jsem běhal v prostěradlovém kostýmu a s mečem, jež jsem vyrobil z klacku, co jsem ukradl taťkovi ze zahrady od rajčat. Moje filosofie "na Larpy by se mělo jezdit pro radost, historickou přesnost a dokonalé kostýmy si nechte na rekonstrukce akcí".Hraju na kytaru, rád vařím (a taky si to sním) a občas zajdu na procházku.',
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
