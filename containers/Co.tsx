import { Grid, Typography, Container, Button } from '@mui/material'
import Logo from '../components/Logo'
import Avatar from '../components/Avatar'
import OrderedList from '../components/OrderedList'

const Co = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h2" textAlign="center" color="primary" gutterBottom>
        C<Logo size="uppercase" />?
      </Typography>
      <Grid container>
        <Grid item xs={12} lg={6}>
          <OrderedList>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
              accusamus iusto voluptatum dicta atque commodi exercitationem.
              Voluptatibus commodi optio ullam doloremque illo vel temporibus
              dicta! Enim eaque nulla optio nemo! Molestiae repudiandae eius ad
              a odio? Aliquid nobis ad tempore ratione, minima et quod quos, quo
              labore optio quidem debitis! Suscipit, labore distinctio! Sunt
              nobis repudiandae nulla placeat aut!
            </li>
            <li>
              Tradiční Larpový tábor pro účastníky ze všech koutků ČR se letos
              přesouvá na novou základnu. Tábor proběhne na Křekově u Valašských
              Klobouk
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
                href="https://www.facebook.com/SMRzakladna/"
              >
                Mapy.cz
              </Button>
            </li>
            <li>Termín: 21.8.2022 - 27.8.2022</li>
            <li>Cena: 4300 Kč</li>
            <li>Letos oproti minulým ročníkům jsme si pro Vás připravili vícedenní LARP, na který od Vás potřebujeme, abyste si připrvili vlastní postavy.
              S postavama Vám pomůže Vydra, můžete ho kontaktovat na FB, Discordu nebo na emailu vydra@malenovska.cz.
              Abyste vědeli, co Vás čeká, zde je počáteční info, kde se bude LARP odehrávat</li>
            <li>Děj našeho larpu se odehrává v malém, ale zdaleka ne bezvýznamném městečku. Nachází se na obchodní stezce, takže přitahuje spoustu bohatých, 
            ale i divných lidí (a jiných bytostí). Někteří z vás zajisté slyšeli kolovat legendy o tom, že město vyhledává spousta mágů. Někteří z vás můžou ve měště již žít,
            některé může lákat vidina bohatství, magicky nadané může lákat tajemno tohoto města. Ale taky můžete mít motivaci pro příchod úplně jiný.</li>
            
            <li>Protože bude tábor zaměřený především na hraní LARPu, je třeba s sebou mít kostým, který odpovídá vaší postavě. Také vás poprosíme
              aby jste si pro letošní rok zajistili vlastní zbraně.</li>
            
            <li>Letošní tábor se bude konat v trochu jiném středisku než jste zvyklí. Základna se nachází u lesa u obce Křekov, v malebné přírodě v srdci Valašska.
              Na základně je tekoucí pitná voda, sprcha, splachovací WC. 
              Ubytování je ve stanech s podsadou a postelemi, nicméně je nutné si vzít dobrý spacák, na konci srpna už může být v noci zima. 
              Doporučujeme si taky vzít karimatku pro případné spaní venku. 
              Na základně je elektřina pouze v organizátorské chatě, ke které účastníci mají přístup výjimečně. Samozřejmě bude možnost nabít telefony na konci tábora,
              abyste se mohli domluvit na odjezdu, ale z naší zkušenosti telefony na táboře jsou spíše na škodu.
              V průběhu tábora bude možné kontaktovat organiátory, stejně tak účastníci budou mít možnost kontaktovat Vás rodiče přes organizátory.
              Ale není poetičtější napsat dopis?</li>
            <li>Co s sebou?</li>
            <li>Kostým na Vaši postavu<br/>
                Spacák<br/>
                Karimatku<br/>
                Baterku nebo jinou svítilnu (doporučujeme čelovku)<br/>
                </li>
            
          </OrderedList>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Avatar src="/smr_zakladna.jpg" variant="large" />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Co
