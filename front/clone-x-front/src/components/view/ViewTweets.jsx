import { Avatar, Flex, Box, Text } from "@radix-ui/themes"
import '../../Styles/ComponentsStyles/ViewTweetStyle.css'

export const ViewTweets = (tweetsData) => {
  return (
    <>
      <hr></hr>
      <Flex width="100%" height="200px" className="container_style">

        <Flex p="6">
          <Avatar fallback="U" />
        </Flex>

        <Flex p="6" width="100%" direction="column">
          <Flex width="100%" align="center">
            <Flex>
              <button>
                <Flex gap="2" align="center">
                  <Text weight="bold" size="3">
                    Niah uwu
                  </Text>
                  <Text size="2">
                    @NiahUwu
                  </Text>
                </Flex>
              </button>
            </Flex>
            <Box ml="auto">
              <Text weight="light" size="3">
                20 de agosto
              </Text>
            </Box>
          </Flex>
          <Box p="3">
            <Text>
              Las estrellas brillaban intensamente en el cielo nocturno mientras el viento suave susurraba entre los árboles. Cada paso resonaba en el silencio de la noche, creando una melodía natural que llenaba el aire de misterio. El mundo parecía detenerse en ese momento mágico e inolvidab
            </Text>
          </Box>
        </Flex>

      </Flex>

    </>
  )
}
