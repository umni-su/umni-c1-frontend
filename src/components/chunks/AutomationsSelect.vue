<script>
import {createErrorNotification} from "@/helpers/notificationHelper.js";
import AutomationMatrix from "@/components/chunks/AutomationMatrix.vue";

export default {
  name: "AutomationsSelect",
  components: {AutomationMatrix},
  props: {
    modelValue: {
      type: Object,
      default: null
    },
  },
  emits: ['update:model-value'],
  data() {
    return {
      trigger: {
        cond: 1,
        value: null
      },
      actions: [],
      triggersItems: [
        {
          value: 1,
          title: this.$t('Always')
        },
        {
          value: 2,
          title: this.$t('Equals')
        },
        {
          value: 3,
          title: this.$t('More than')
        },
        {
          value: 4,
          title: this.$t('Less than')
        }
      ],
      items: [
        {
          id: 1,
          value: this.$t('Relays')
        },
        {
          id: 2,
          value: this.$t('Boiler')
        },
        {
          id: 3,
          value: this.$t('Matrix')
        }
      ],
      relayActions: [
        {
          type: 1,
          value: this.$t('Turn on')
        },
        {
          type: 2,
          value: this.$t('Turn off')
        }
      ],
      boilerActions: [
        {
          title: this.$t('Turn off'),
          value: 0
        },
        {
          title: this.$t('Turn on'),
          value: 1
        }
      ],
      type: null
    }
  },
  computed: {
    doConfig() {
      return this.$store.getters['getDoSettings']
    },
    allData() {
      return {
        trigger: this.trigger,
        actions: this.actions
      }
    }
  },
  created() {
    this.actions = this.modelValue?.actions
    this.trigger = this.modelValue?.trigger
    if (this.actions === undefined) {
      this.actions = []
    }
    if (this.trigger?.cond === undefined) {
      this.trigger = {...this.trigger, ...{cond: 1, value: null}}
    }
  },
  methods: {
    addAction(type) {
      const existing = this.actions?.find(a => a.type === type)
      if (!existing) {
        if (type === 1) {
          this.actions.push(
            {
              type,
              on: [],
              off: [],
            }
          )
        } else if (type === 2) {
          this.actions.push(
            {
              type,
              ch: 1
            }
          )
        } else if (type === 3) { // matrix
          this.actions.push(
            {
              type,
              matrix: []
            }
          )
        }
      } else {
        this.$store.commit('addNotification', createErrorNotification(this.$t('This type already exists in automation')))
      }
    },
    deleteAction(type) {
      this.actions = this.actions.filter(a => a.type !== type)
      this.$emit('update:model-value', this.allData)
    }
  }
}
</script>

<template>
  <VSheet>
    <div class="text-h6 text-center mb-4">
      {{ $t('When value changed') }}
    </div>
    <VSelect
      v-model="trigger.cond"
      class="mb-4"
      :label="$t('Condition')"
      :items="triggersItems"
      @update:model-value="$emit('update:model-value', allData)"
    >
      <template #append>
        <VTextField
          v-model.number="trigger.value"
          type="number"
          :disabled="triggersItems.filter(t => t.value !== 1).map(v => v.value).indexOf(trigger.cond) === -1"
          @update:model-value="$emit('update:model-value', allData)"
        />
      </template>
    </VSelect>
    <div class="text-h6 text-center mb-4">
      {{ $t('Run action') }}
    </div>
    <VBtnGroup class="w-100 overflow-visible">
      <VSelect
        v-model="type"
        :label="$t('Action')"
        density="compact"
        :items="items"
        item-value="id"
        item-title="value"
      />
      <VBtn
        v-if="type"
        color="primary"
        class="ml-2"
        density="comfortable"
        variant="tonal"
        icon="mdi-plus"
        @click="addAction(type)"
      />
    </VBtnGroup>
    <VCard
      v-for="a in actions"
      :key="a"
      variant="tonal"
      class="mt-4"
    >
      <template
        v-if="a.type === 1"
        #subtitle
      >
        {{ $t('Relays') }}
      </template>
      <template
        v-else-if="a.type === 2"
        #subtitle
      >
        {{ $t('Climate') }}
      </template>
      <template
        v-else
        #subtitle
      >
        {{ $t('Matrix') }}
      </template>
      <VCardText class="pa-0">
        <div class="text-center">
          <VIcon icon="mdi-arrow-down" />
        </div>
      </VCardText>
      <VCardText v-if="a.type === 1">
        <VBtn
          class="del"
          variant="plain"
          density="comfortable"
          color="error"
          icon="mdi-close"
          @click="deleteAction(a.type)"
        />
        <VList>
          <VListItem>
            <template #title>
              {{ $t('Turn on') }}
            </template>
            <template #subtitle>
              {{ $t('State will be inverse, when level is normalized') }}
            </template>
            <template #default>
              <VBtnToggle
                v-model="a.on"
                class="mt-2"
                multiple
                density="compact"
                @update:model-value="$emit('update:model-value', allData)"
              >
                <VTooltip
                  v-for="(doConf, index) in doConfig"
                  :key="doConf"
                  location="top"
                  hover
                >
                  {{ doConf?.label ? doConf.label : $t('Relay #{index}', {index: (doConf.index + 1)}) }}

                  <template #activator="{props}">
                    <VBtn
                      v-bind="props"
                      :key="doConf"
                      color="primary"
                      density="comfortable"
                      variant="tonal"
                      :value="doConf.index"
                      rounded="0"
                      icon
                    >
                      <template #default>
                        {{ index + 1 }}
                      </template>
                    </VBtn>
                  </template>
                </VTooltip>
              </VBtnToggle>
            </template>
          </VListItem>
          <VListItem>
            <template #title>
              {{ $t('Turn off') }}
            </template>
            <template #subtitle>
              {{ $t('State will be inverse, when level is normalized') }}
            </template>
            <template #default>
              <VBtnToggle
                v-model="a.off"
                class="mt-2"
                density="compact"
                multiple
              >
                <VTooltip
                  v-for="(doConf, index) in doConfig"
                  :key="doConf"
                  location="top"
                  hover
                >
                  {{ doConf?.label ? doConf.label : $t('Relay #{index}', {index: doConf.index}) }}

                  <template #activator="{props}">
                    <VBtn
                      v-bind="props"
                      :key="doConf"
                      color="primary"
                      density="comfortable"
                      variant="tonal"
                      :value="doConf.index"
                      rounded="0"
                      icon
                    >
                      <template #default>
                        {{ index + 1 }}
                      </template>
                    </VBtn>
                  </template>
                </VTooltip>
              </VBtnToggle>
            </template>
          </VListItem>
        </VList>
      </VCardText>
      <VCardText v-else-if="a.type === 2">
        <VBtn
          class="del"
          variant="plain"
          density="comfortable"
          color="error"
          icon="mdi-close"
          @click="deleteAction(a.type)"
        />
        <VSelect
          v-model="a.ch"
          :hide-details="false"
          :label="$t('Heating')"
          :items="boilerActions"
          @update:model-value="$emit('update:model-value', actions)"
        >
          <template #details>
            {{ $t('State will be inverse, when level is normalized') }}
          </template>
        </VSelect>
      </VCardText>
      <VCardText v-else>
        <VBtn
          class="del"
          variant="plain"
          density="comfortable"
          color="error"
          icon="mdi-close"
          @click="deleteAction(a.type)"
        />
        <AutomationMatrix
          v-model="a.matrix"
          @update:model-value="$emit('update:model-value', allData)"
        />
      </VCardText>
    </VCard>
  </VSheet>
</template>

<style scoped lang="scss">
.del {
  position: absolute;
  z-index: 10;
  top: 0;
  right: 0
}
</style>
